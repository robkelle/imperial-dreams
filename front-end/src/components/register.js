import React, { Component } from 'react';

import buttonBackground from '../images/buttonBackground.jpg';
import { Link } from 'react-router-dom';

// Set styling
const classes = {
	formStyle: {
		backgroundColor: 'rgba(0, 51, 102, .85)',
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

class Register extends Component {
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
		password: null,
		userExists: false,
		usernameValid: true,
		passwordValid: true,
		repeatPasswordValid: true,
		userCreated: null
	};

	userSignup = () => {
		fetch('http://localhost:4000/api/user/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				repeatPassword: this.state.repeatPassword
			})
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({ userExists: res.userExists });
				this.setState({ usernameValid: res.usernameValid });
				this.setState({ passwordValid: res.passwordValid });
				this.setState({ repeatPasswordValid: res.repeatPasswordValid });
				this.setState({ userCreated: res.userCreated });
			})
			.then((res) => {
				if (this.state.userCreated === true) {
					this.props.history.push('/login');
				}
			});
	};

	// prevent page from reloading and run function to validate fields
	handleSubmit = (e) => {
		e.preventDefault();

		this.userSignup();
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
							onChange={(e) => {
								this.setState({ username: e.target.value });
							}}
						/>{' '}
						{!this.state.usernameValid ? (
							<div className="animated fadeInUp">
								<p className="text-danger">Username must be Alpha-numeric and over 8 characters long</p>
							</div>
						) : (
							''
						)}
						{this.state.userExists ? (
							<div className="animated fadeInUp">
								<p className="text-danger">This username already exists please try another</p>
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

						{!this.state.passwordValid ? (
							<div className="animated fadeInUp">
								<p className="text-danger">
									Password must be over 8 characters and contain a symbol, number and letter
								</p>
							</div>
						) : (
							''
						)}
					</div>
					{this.state.password > '' && (
						<div className="form-group">
							<label htmlFor="repeatpassword"> Repeat Password</label>
							<input
								className="form-control"
								type="password"
								onChange={(e) => {
									this.setState({ repeatPassword: e.target.value });
								}}
							/>
							{!this.state.repeatPasswordValid ? (
								<div className="animated fadeInUp">
									<p className="text-danger">Your passwords must match.</p>
								</div>
							) : (
								''
							)}
						</div>
					)}

					<button
						type="submit"
						className="btn btn-default float-right"
						style={this.state.buttonStyle}
						onClick={(e) => this.handleSubmit(e)}
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

					<div align="right" />
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
