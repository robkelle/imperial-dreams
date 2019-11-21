// @flow
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import buttonBackground from '../images/buttonBackground.jpg';
import { Link } from 'react-router-dom';

const classes = {
	formStyle: {
		backgroundColor: 'rgba(0, 51, 102, .75)',
		padding: '10px 35px 60px 35px',
		color: '#BEBEBE',
		marginTop: 10,
		width: 500,
		fontSize: 16
	},
	hrStyle: {
		borderTop: '1px solid #fff',
		color: '#fff'
	},
	liStyle: {
		listStyleType: 'none',
		color: 'red'
	}
};

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
		return (
			<div align="center">
				<form style={classes.formStyle} align="left">
					<p className="h5">Account Login</p>
					<hr style={classes.hrStyle} />
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
					<hr style={classes.hrStyle} />
					<p>
						Don't have an account? <Link to="/register">Sign up now!</Link>
					</p>
					<p>
						Forgot your <Link to="/forgot_username">username?</Link>
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

export default Login;
