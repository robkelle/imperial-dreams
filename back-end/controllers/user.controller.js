import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config.json";

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

exports.signup = (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 10);

  let user = new User({
    username: req.body.username,
    password: hashedPassword
  });

  user.save(error => {
    if (error) {
      res.status(500).send({
        message: "Something went wrong!"
      });
    } else {
      res.status(201).send({
        message: "User was created."
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
        res.status(500).send({ message: "Internal server error." });
      }

      if (!user) {
        res.status(404).send({ message: "No user found." });
      }

      try {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
      } catch (e) {
        return;
      }

      if (!passwordIsValid) {
        res.status(401).send({ message: "Password is invalid." });
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
          { upsert: "true" },
          function(err) {
            if (err) {
              console.log({
                message: "There has been an error updating the user token.",
                httpStatus: 500,
                errorMessage: err
              });
            } else {
              console.log({
                message: "The token has been updated on login.",
                httpStatus: 200
              });
            }
          }
        );

        const cookieOptions = {
          secure: false, // Marks the cookie to be used with HTTPS only.
          httpOnly: true, // Flags the cookie to be accessible only by the web server.
          expires: 0, // Makes this a session-only cookie
          path: "/"
        };

        // Sends client response
        res.cookie("accessToken", token, cookieOptions);
        res.json({
          refreshToken: refreshToken,
          accessToken: token,
          username: user.username,
          isLoggedIn: true
        });
      }
    }
  ).catch(err => {
    res.status(400).send({ message: "Failed to sign in.", httpStatus: 400 });
  });
};

exports.verifyAuthorization = (req, res) => {
  res.json({ message: "User is authorized!", httpStatus: 200 });
};

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
          console.log("Deleted access token for", result.username);
        }
        res.clearCookie("accessToken");
        res.json({
          isLoggedIn: false
        });
      }
    );
  }
};
