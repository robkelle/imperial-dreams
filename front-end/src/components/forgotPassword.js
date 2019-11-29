import React, { useState } from 'react';
import buttonBackground from '../images/buttonBackground.jpg';
import config from '../config.json';

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
				console.log(res);
			});
	};

	return (
		<div align="center">
			<form style={classes.formStyle} align="left">
				<p className="h5">Forgot Password</p>
				<hr style={classes.hrStyle} />
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} />
				</div>

				<button
					type="submit"
					className="btn btn-default float-right"
					style={classes.buttonStyle}
					onClick={(e) => handleSubmit(e)}
				>
					Reset Password
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
