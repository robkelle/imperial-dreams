import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import buttonBackground from '../images/buttonBackground.jpg';
import config from '../config.json';

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
	},
	buttonStyle: {
		backgroundImage: `url(${buttonBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		color: '#BEBEBE',
		width: 200
	}
};

const ForgotPassword = () => {
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
			<form style={classes.formStyle} align="left">
				<p>
					<Link to="/login">Back to Login</Link>
				</p>
				<p className="h5">Forgot Password</p>
				<small>Send a link to your email to reset your password</small>
				<hr style={classes.hrStyle} />
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
					style={classes.buttonStyle}
					onClick={(e) => handleSubmit(e)}
				>
					Send Reset Link
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
