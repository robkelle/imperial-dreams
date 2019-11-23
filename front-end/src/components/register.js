import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import buttonBackground from "../images/buttonBackground.jpg";
import { Link } from "react-router-dom";

// Set styling
const classes = {
  formStyle: {
    backgroundColor: "rgba(0, 51, 102, .75)",
    padding: "10px 35px 60px 35px",
    color: "#BEBEBE",
    marginTop: 10,
    width: 500,
    fontSize: 16
  },
  hrStyle: {
    borderTop: "1px solid #fff",
    color: "#fff"
  },
  liStyle: {
    listStyleType: "none",
    color: "red"
  }
};

class Register extends Component {
  state = {
    buttonStyle: {
      backgroundImage: `url(${buttonBackground})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      color: "#BEBEBE",
      width: 160
    },
    username: null,
    password: null,
    repeatPassword: null,
    isValid: true,
    userNameExists: true
  };

  handleSignUp = () => {
    fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("Check console for " + res);
      })
      .catch(err => {
        console.log("something went wrong " + err);
      });
  };

  // Calls userValidate method defined in user controller. Method checks whether the username already exists.
  // Sets 'userNameExists' state based on return from userValidate method (true or false)

  validate = () => {
    fetch("http://localhost:4000/api/user/userValidate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ userNameExists: res.userExists });
      });
    // If none of the conditions are met we run the handleSingUp function, otherwise we set isValid state to false.
    if (
      this.state.username == null ||
      this.state.password == null ||
      this.state.repeatSame == false ||
      this.state.password != this.state.repeatPassword ||
      this.state.userNameExists == true
    ) {
      this.setState({
        isValid: false
      });
    } else {
      this.handleSignUp();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.validate();
  };
  render() {
    return (
      <div align="center">
        <form style={classes.formStyle} align="left">
          <p className="h5">Register Account</p>
          <hr style={classes.hrStyle} />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              type="text"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
            {!this.state.username && !this.state.isValid ? (
              <div className="animated fadeInUp">
                <p className="text-danger">Please provide a username</p>
              </div>
            ) : (
              ""
            )}
            {!this.state.userNameExists == false && !this.state.isValid ? (
              <div className="animated fadeInUp">
                <p className="text-danger">
                  This username already exists please try another
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />

            {!this.state.password && !this.state.isValid ? (
              <div className="animated fadeInUp">
                <p className="text-danger">Please provide a password.</p>
              </div>
            ) : (
              ""
            )}
          </div>
          {this.state.password > "" && (
            <div className="form-group">
              <label htmlFor="repeatpassword"> Repeat Password</label>
              <input
                className="form-control"
                type="password"
                onChange={e => {
                  this.setState({ repeatPassword: e.target.value });
                }}
              />
              {this.state.repeatPassword != this.state.password &&
              !this.state.isValid ? (
                <div className="animated fadeInUp">
                  <p className="text-danger">Your passwords must match.</p>
                </div>
              ) : (
                ""
              )}
              {!this.state.repeatPassword && !this.state.isValid ? (
                <div className="animated fadeInUp">
                  <p className="text-danger">Please repeat your password.</p>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Username
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-default float-right"
            style={this.state.buttonStyle}
            onClick={e => this.handleSubmit(e)}
          >
            Register
          </button>
          <br />
          <br />
          <hr style={classes.hrStyle} />
          <p>
            Have an account? <Link to="/login">Log in here!</Link>
          </p>

          <p>
            Forgot your <Link to="/forgot_password">password?</Link>
          </p>

          <div align="right">
            {/* https://www.npmjs.com/package/react-google-login */}
            <GoogleLogin />
          </div>
        </form>
      </div>
    );
  }
}

// Login.propTypes = {
// 	formStyle: PropTypes.object.isRequired,
// 	hrStyle: PropTypes.object.isRequired
// };

export default Register;
