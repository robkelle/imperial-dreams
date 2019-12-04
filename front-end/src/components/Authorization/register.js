import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Register extends Component {
	state = {
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
		const { style } = this.props;
		return (
			<div align="center" className="animated fadeInDown faster">
				<div style={style.main}>
					<form style={style.formStyle} align="left">
						<h1 style={style.labelStyle}>Register Account</h1>
						<hr style={style.hrStyle} />
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
									<p className="text-danger">
										Username must be Alpha-numeric and over 8 characters long
									</p>
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
							style={style.buttonStyle}
							onClick={(e) => this.handleSubmit(e)}
						>
							Register
						</button>
						<br />
						<br />
						<hr style={style.hrStyle} />
						<p>
							Have an account? <Link to="/login">Log in here!</Link>
						</p>

						<p>
							Forgot your <Link to="/forgot_password">password?</Link>
						</p>

						<div align="right" />
					</form>
				</div>
			</div>
		);
	}
}

// Login.propTypes = {
// 	formStyle: PropTypes.object.isRequired,
// 	hrStyle: PropTypes.object.isRequired
// };

export { Register };
