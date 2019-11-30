import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import buttonBackground from '../images/buttonBackground.jpg';
import queryString from 'query-string';
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
		width: 100
	}
};

class ResetPassword extends Component {
	handleSubmit = (e) => {
		e.preventDefault();

		const resetToken = queryString.parse(this.props.location.search).reset_token;

		console.log(resetToken);

		// fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/reset`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		email: email
		// 	})
		// })
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 	});
	};

	render() {
		return (
			<div align="center">
				<form style={classes.formStyle} align="left">
					<p>
						<Link to="/login">Back to Login</Link>
					</p>
					<p className="h5">Reset Password</p>
					<small>Please choose your new password</small>
					<hr style={classes.hrStyle} />
					<div className="form-group">
						<label htmlFor="password">New Password</label>
						<input className="form-control" type="password" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Confirm Password</label>
						<input className="form-control" type="password" />
					</div>

					<button
						type="submit"
						className="btn btn-default float-right"
						style={classes.buttonStyle}
						onClick={(e) => this.handleSubmit(e)}
					>
						Save
					</button>
				</form>
			</div>
		);
	}
}

export default ResetPassword;
