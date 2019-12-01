import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import config from '../../config.json';

const ForgotPassword = (props) => {
	const { style } = props;
	// Set React Hooks
	const [ email, setEmail ] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/forgot`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setEmail('');
			});
	};

	return (
		<div align="center">
			<div style={style.main}>
				<form style={style.formStyle} align="left">
					<p>
						<Link to="/login">Back to Login</Link>
					</p>
					<h1 style={style.labelStyle}>Forgot Password</h1>
					<small>Send a link to your email to reset your password</small>
					<hr style={style.hrStyle} />
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							className="form-control"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-default float-right"
						style={style.buttonStyle}
						onClick={(e) => handleSubmit(e)}
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export { ForgotPassword };
