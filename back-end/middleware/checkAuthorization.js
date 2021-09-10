import User from '../models/user.model';
import config from '../config.json';
import jwt from 'jsonwebtoken';

const checkAuthorization = (req, res, next) => {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		res.clearCookie('accessToken');
		res.status(401).send({
			message: 'Invalid or missing authorization token.',
			httpStatus: 401
		});
	} else {
		// Verify Access Token
		let userJWTPayload = jwt.verify(accessToken, config.ACCESS_TOKEN.SECRET, (expired, decoded) => {
			if (expired) {
        res.clearCookie('accessToken');
				User.findOne(
					{
						username: req.cookies.user.toLowerCase()
					},
					(error, user) => {
						if (error) {
							res.status(500).send({ message: 'Internal server error.' });
						}

						if (!user) {
							res.status(404).send({ message: 'No user found.' });
						}

						jwt.verify(user.refreshToken.token, config.REFRESH_TOKEN.SECRET, (expired, decoded) => {
							if (!expired) {
								// Sign JWT token
								let token = jwt.sign(
									{
										username: user.username
									},
									config.ACCESS_TOKEN.SECRET,
									{
										expiresIn: config.ACCESS_TOKEN.EXPIRATION
									}
								);

								// ----------------------------------------------------------
								let jwtTokenDecoded = jwt.decode(token);

								// Updates the users access token in the database when the login API is hit
								User.findOneAndUpdate(
									{ username: req.cookies.user.toLowerCase() },
									{
										accessToken: {
											issuer: jwtTokenDecoded.username,
											token: token,
											iat: new Date(jwtTokenDecoded.iat * 1000),
											exp: new Date(jwtTokenDecoded.exp * 1000)
										}
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
												message: 'The token has been updated per refresh token.',
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
                next();
								// ----------------------------------------------------------
							} else {
                res.status(401).send({
                  message: 'Refresh token is expired or not found.',
                  httpStatus: 401
                });
              }
						});
					}
				);
			} else {
				return decoded;
			}
		});

		if (userJWTPayload) {
			User.findOne({
				'accessToken.token': accessToken
			}).then(function(user) {
				if (!user) {
					res.status(401).send({
						message: 'User needs to login before accessing this API.',
						httpStatus: 401
					});
				} else {
					// Executes the middleware succeeding this middleware function
					next();
				}
			});
		} else {
		}
	}
};

module.exports = checkAuthorization;
