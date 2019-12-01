import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import config from '../../config.json';
import queryString from 'query-string';

class ResetPassword extends Component {
	handleSubmit = (e) => {
		e.preventDefault();

		const resetToken = queryString.parse(this.props.location.search).reset_token;

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/reset`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: this.state.password,
				resetToken: resetToken
			})
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log(res);
			});
	};

	render() {
		const { style } = this.props;
		return (
			<div align="center">
				<form style={style.formStyle} align="left">
					<p>
						<Link to="/login">Back to Login</Link>
					</p>
					<p className="h5">Reset Password</p>
					<small>Please choose your new password</small>
					<hr style={style.hrStyle} />
					<div className="form-group">
						<label htmlFor="password">New Password</label>
						<input
							className="form-control"
							type="password"
							onChange={(e) => {
								this.setState({ password: e.target.value });
							}}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password</label>
						<input
							className="form-control"
							type="password"
							onChange={(e) => {
								this.setState({ confirmPassword: e.target.value });
							}}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-default float-right"
						style={style.buttonStyle}
						onClick={(e) => this.handleSubmit(e)}
					>
						Save
					</button>
				</form>
			</div>
		);
	}
}

export { ResetPassword };
