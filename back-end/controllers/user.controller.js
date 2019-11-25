import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import transporter from '../middleware/mail';
import config from '../config.json';

exports.userValidate = (req, res) => {
	User.findOne(
		{
			username: req.body.username
		},
		(error, user) => {
			if (user) {
				res.send({ userExists: true });
			} else {
				res.send({ userExists: false });
			}
		}
	);
};

/*
    Creates a new user account
*/
exports.signup = (req, res) => {
	var hashedPassword = bcrypt.hashSync(req.body.password, 10);

	let user = new User({
		username: req.body.username,
		password: hashedPassword
	});

	user.save((error) => {
		if (error) {
			res.status(500).send({
				message: 'Something went wrong!'
			});
		} else {
			res.status(201).send({
				message: 'User was created.'
			});
		}
	});
};

/*
    Logs a valid user in
*/
exports.signin = (req, res, next) => {
	User.findOne(
		{
			username: req.body.username
		},
		(error, user) => {
			if (error) {
				res.status(500).send({ message: 'Internal server error.' });
			}

			if (!user) {
				res.status(404).send({ message: 'No user found.' });
			}

			try {
				var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			} catch (e) {
				return;
			}

			if (!passwordIsValid) {
				res.status(401).send({ message: 'Password is invalid.' });
			} else {
				// Sign JWT token
				const token = jwt.sign(
					{
						username: user.username,
						password: user.password,
						domain: req.body.domain
					},
					config.ACCESS_TOKEN.SECRET,
					{
						expiresIn: config.ACCESS_TOKEN.EXPIRATION
					}
				);

				// Sign JWT refresh token
				const refreshToken = jwt.sign(
					{
						username: user.username,
						password: user.password,
						domain: req.body.domain
					},
					config.REFRESH_TOKEN.SECRET,
					{
						expiresIn: config.REFRESH_TOKEN.EXPIRATION
					}
				);

				// Updates the users access token in the database when the login API is hit
				User.findOneAndUpdate(
					{ username: req.body.username },
					{
						accessToken: token,
						refreshToken: refreshToken
					},
					{ upsert: 'true' },
					function(err) {
						if (err) {
							console.log({
								message: 'There has been an error updating the user token.',
								httpStatus: 500,
								errorMessage: err
							});
						} else {
							console.log({
								message: 'The token has been updated on login.',
								httpStatus: 200
							});
						}
					}
				);

				const cookieOptions = {
					secure: false, // Marks the cookie to be used with HTTPS only.
					httpOnly: true, // Flags the cookie to be accessible only by the web server.
					expires: 0, // Makes this a session-only cookie
					path: '/'
				};

				// Sends client response
				res.cookie('accessToken', token, cookieOptions);
				res.status(200).send({
					refreshToken: refreshToken,
					username: user.username,
					isLoggedIn: true
				});
			}
		}
	).catch((err) => {
		res.status(400).send({ message: 'Failed to sign in.', httpStatus: 400 });
	});
};

/*
    Logs a user out when called by clearing cookies
*/
exports.logout = (req, res) => {
	const accessToken = req.cookies.accessToken;
	const userJWTPayload = jwt.verify(accessToken, config.ACCESS_TOKEN.SECRET);
	if (!userJWTPayload) {
	} else {
		User.findOneAndUpdate(
			{ accessToken: accessToken },
			{
				accessToken: null
			},
			function(err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log({ message: `Deleted access token for ${result.username}`, httpStatus: 200 });
				}
				res.clearCookie('accessToken');
				res.json({
					isLoggedIn: false
				});
			}
		);
	}
};

exports.submitForgotPasswordUser = (req, res) => {
	const sendPasswordResetEmail = (token) => {
		const mailOptions = {
			from: config.MAIL_SERVER.USER,
			to: req.body.email,
			subject: 'Password Reset',
			html: `<span>Hello,</span><div style="padding: 10px 10px 10px 10px;">
      <p>Please click <a href="http://localhost:3000/#/reset/${token}'">HERE</a>
      to verify your <strong>Imperial Dreams</strong> Account.</p>`
		};

		transporter.sendMail(mailOptions, function(err, info) {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
			}
		});
	};

	// Find a valid user
	User.findOne(
		{
			email: req.body.email
		},
		(err, user) => {
			if (err || !user) {
				res.status(500).send({ message: 'Incorrect or unverified email. Please try again.' });
			}
		}
	).then((user) => {
		const payload = { userId: user._id };
		const token = jwt.sign(payload, config.ACCESS_TOKEN.SECRET, {
			expiresIn: 300
		});

		sendPasswordResetEmail(token);
	});
};
