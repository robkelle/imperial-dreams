import User from '../models/user.model';
import config from '../config.json';
import jwt from 'jsonwebtoken';

const checkAuthorization = function(req, res, next) {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		res.clearCookie('accessToken');
		res.status(401).send({ message: 'Invalid or missing authorization token.', httpStatus: 401 });
	} else {
		// Verify Access Token
		let userJWTPayload = jwt.verify(accessToken, config.ACCESS_TOKEN.SECRET, (error, decoded) => {
			if (error) {
				res.clearCookie('accessToken');
			} else {
				return decoded;
			}
		});

		if (!userJWTPayload) {
			res.clearCookie('accessToken');
			res.status(401).send({ message: 'Invalid or missing authorization token.', httpStatus: 401 });
		} else {
			User.findOne({ 'accessToken.token': accessToken }).then(function(user) {
				if (!user) {
					res
						.status(401)
						.send({ message: 'User needs to login before accessing this API.', httpStatus: 401 });
				} else {
					console.log({ message: `${user.username} is logged in.`, httpStatus: 200 });
					// Executes the middleware succeeding this middleware function
					next();
				}
			});
		}
	}
};

module.exports = checkAuthorization;
