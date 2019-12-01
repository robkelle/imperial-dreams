// @flow

import React, { Component } from 'react';

import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import config from '../../config.json';
import { withCookies } from 'react-cookie';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: null,
			password: null,
			isValid: true,
			isPasswordValid: true
		};
	}

	handleLogin = () => {
		const { cookies } = this.props;
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/signin`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				domain: ''
			})
		})
			.then((res) => {
				return res.json();
			})
			.then((res, next) => {
				if (res.isLoggedIn === true) {
					cookies.set('isAuthorized', res.isLoggedIn, { path: '/' });
					cookies.set('loggedInUser', res.username, { path: '/' });
					this.props.history.push('/loading');
				} else {
					this.setState({
						isPasswordValid: false
					});
				}
			})
			.catch((err) => {
				if (err) {
					return new Error('Logging in from the client failed.');
				}
			});
	};

	validate = () => {
		if (this.state.username == null || this.state.password == null) {
			this.setState({
				isValid: false
			});
		} else {
			this.handleLogin();
		}
	};

	handleSubmit = (e) => {
		// Prevents page from reloading
		e.preventDefault();

		// Validate fields
		this.validate();
	};

	render() {
		const { style } = this.props;
		return (
			<div align="center">
				<form style={style.formStyle} align="left">
					<p className="h5">Account Login</p>
					<hr style={style.hrStyle} />
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							className="form-control"
							type="text"
							onChange={(e) => {
								this.setState({ username: e.target.value });
							}}
						/>
						{!this.state.username && !this.state.isValid ? (
							<div className="animated fadeInUp">
								<p className="text-danger">
									<strong>Please enter a valid username.</strong>
								</p>
							</div>
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className="form-control"
							type="password"
							onChange={(e) => {
								this.setState({ password: e.target.value });
							}}
						/>

						{!this.state.isPasswordValid ? (
							<div className="animated fadeInUp">
								<p className="text-danger">
									<strong>The username or password you entered is incorrect.</strong>
								</p>
							</div>
						) : (
							''
						)}

						{!this.state.password && !this.state.isValid ? (
							<div className="animated fadeInUp">
								<p className="text-danger">
									<strong>Please enter a valid password.</strong>
								</p>
							</div>
						) : (
							''
						)}
					</div>
					<div className="form-check">
						<input type="checkbox" className="form-check-input" id="rememberMe" />
						<label className="form-check-label" htmlFor="rememberMe">
							Remember Username
						</label>
					</div>
					<button
						type="submit"
						className="btn btn-default float-right"
						style={style.buttonStyle}
						onClick={(e) => this.handleSubmit(e)}
					>
						Log in
					</button>
					<br />
					<br />
					<hr style={style.hrStyle} />
					<p>
						Don't have an account? <Link to="/register">Sign up now!</Link>
					</p>
					{/* <p>
						Forgot your <Link to="/forgot_username">username?</Link>
					</p> */}
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

export default withCookies(Login);
