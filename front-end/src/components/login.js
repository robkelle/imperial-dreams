import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GoogleLogin from 'react-google-login';
import buttonBackground from '../images/buttonBackground.jpg';

class Login extends Component {
	state = {
		buttonStyle: {
			backgroundImage: `url(${buttonBackground})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			color: '#BEBEBE',
			width: 160
		},
		username: null,
		password: null
	};

	handleSubmit = (e) => {
		// Prevents page from reloading
		e.preventDefault();

		this.setState({
			validate: true
		});
	};

	render() {
		const props = this.props;
		return (
			<form style={props.formStyle}>
				<p className="h5">Account Login</p>
				<hr style={props.hrStyle} />
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						className="form-control"
						type="text"
						onChange={(e) => {
							this.setState({ username: e.target.value });
						}}
					/>
					{!this.state.username && this.state.validate ? (
						<div className="animated fadeInUp">
							<p className="text-danger">Please choose a username.</p>
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

					{!this.state.password && this.state.validate ? (
						<div className="animated fadeInUp">
							<p className="text-danger">Please provide a password.</p>
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
					style={this.state.buttonStyle}
					onClick={(e) => this.handleSubmit(e)}
				>
					Log in
				</button>
				<br />
				<br />
				<hr style={props.hrStyle} />
				<p>
					Don't have an account? <a href="/">Sign up now!</a>
				</p>
				<p>
					Forgot your <a href="/">username?</a>
				</p>
				<p>
					Forgot your <a href="/">password?</a>
				</p>

				<div align="right">
					{/* https://www.npmjs.com/package/react-google-login */}
					<GoogleLogin />
				</div>
			</form>
		);
	}
}

Login.propTypes = {
	formStyle: PropTypes.object.isRequired,
	hrStyle: PropTypes.object.isRequired
};

export default Login;
