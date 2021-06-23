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
        res
          .status(401)
          .send({
            message: 'Expired token.',
            httpStatus: 401
          });
      } else {
        return decoded;
      }
    });

    if (userJWTPayload) {
      User.findOne({
        'accessToken.token': accessToken
      }).then(function (user) {
        if (!user) {
          res
            .status(401)
            .send({
              message: 'User needs to login before accessing this API.',
              httpStatus: 401
            });
        } else {
          // Executes the middleware succeeding this middleware function
          next();
        }
      });
    } else {}
  }
};

module.exports = checkAuthorization;