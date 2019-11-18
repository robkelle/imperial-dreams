import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config.json';

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
				const token = jwt.sign(
					{ username: user.username, domain: req.body.domain, created: new Date() },
					config.SECRET,
					{
						expiresIn: config.JWT_EXPIRATION
					}
				);
				res.json({ token: token, username: user.username, decode: jwt.decode(token) });
			}
		}
	);
};
