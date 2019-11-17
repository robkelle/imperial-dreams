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
		}
	};

	render() {
		const props = this.props;
		return (
			<form style={props.formStyle}>
				<p className="h5">Account Login</p>
				<hr style={props.hrStyle} />
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input className="form-control" type="text" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input className="form-control" type="password" />
				</div>
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="rememberMe" />
					<label className="form-check-label" htmlFor="rememberMe">
						Remember Username
					</label>
				</div>
				<button type="submit" className="btn btn-default float-right" style={this.state.buttonStyle}>
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
