// @flow

import {
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import config from '../../config.json';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		color: 'rgb(217, 217, 217) !important'
	},
	underline: {
		'&:after': {
			borderBottom: '2px solid rgb(217, 217, 217)'
		},
		'&:before': {
			borderBottom: '2px solid #fff'
		}
	}
});

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: null,
			password: null,
			isValid: true,
			isPasswordValid: true
		};
	}

	handleLogin = () => {
		const { cookies } = this.props;
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/signin`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				domain: ''
			})
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.isLoggedIn === true) {
					cookies.set('isAuthorized', res.isLoggedIn, { path: '/' });
					cookies.set('user', res.username, { path: '/' });
					cookies.set('_id', res._id, { path: '/' });
					this.props.history.push('/loading');
				} else {
					this.setState({
						isPasswordValid: false
					});
				}
			})
			.catch((err) => {
				if (err) {
					return new Error('Logging in from the client failed.');
				}
			});
	};

	validate = () => {
		if (this.state.username == null || this.state.password == null) {
			this.setState({
				isValid: false
			});
		} else {
			this.handleLogin();
		}
	};

	handleSubmit = (e) => {
		// Prevents page from reloading
		e.preventDefault();

		// Validate fields
		this.validate();
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="animated fadeInDown faster">
				<Grid container={true} justify={'center'}>
					<Grid item={true} xs={12} sm={8} md={5} lg={5} xl={3}>
						<Card
							style={{
								backgroundColor: 'rgba(24, 24, 24, .85)',
								marginTop: 50,
								padding: '25px 35px 60px 35px',
								borderRadius: '25px',
								color: '#fff'
							}}
						>
							<Typography
								gutterBottom
								variant="h4"
								align="center"
								style={{
									fontFamily: 'Trade Winds',
									color: 'rgb(217, 217, 217)'
								}}
							>
								Account Login
							</Typography>

							<CardContent
								style={{
									border: 'solid 15px rgb(138, 3, 3)',
									backgroundColor: '#181818',
									borderRadius: '25px'
								}}
							>
								<form>
									<div>
										<FormControl margin="normal" style={{ width: '75%' }}>
											<InputLabel className={classes.root}>Username</InputLabel>
											<Input
												type="text"
												required={true}
												classes={{ underline: classes.underline, root: classes.root }}
												fullWidth={true}
												onChange={(e) => {
													this.setState({ username: e.target.value });
												}}
											/>

											{!this.state.username && !this.state.isValid ? (
												<div className="animated fadeInUp">
													<FormHelperText error={true} variant="outlined">
														Please enter a valid username.
													</FormHelperText>
												</div>
											) : (
												''
											)}
										</FormControl>
									</div>
									<div>
										<FormControl margin="normal" style={{ width: '75%' }}>
											<InputLabel className={classes.root}>Password</InputLabel>
											<Input
												type="password"
												required={true}
												classes={{ underline: classes.underline, root: classes.root }}
												fullWidth={true}
												onChange={(e) => {
													this.setState({ password: e.target.value });
												}}
											/>
											{!this.state.isPasswordValid ? (
												<div className="animated fadeInUp">
													<FormHelperText error={true} variant="outlined">
														The username or password you entered is incorrect.
													</FormHelperText>
												</div>
											) : (
												''
											)}

											{!this.state.password && !this.state.isValid ? (
												<div className="animated fadeInUp">
													<FormHelperText error={true} variant="outlined">
														Please enter a valid password.
													</FormHelperText>
												</div>
											) : (
												''
											)}
										</FormControl>
									</div>

									<br />
									<div>
										<Checkbox type="checkbox" className={classes.root} />
										<label htmlFor="rememberMe">Remember Username</label>
									</div>
									<Button
										type="submit"
										style={{
											backgroundColor: 'rgb(217, 217, 217)',
											color: '#181818',
											width: 160
										}}
										onClick={(e) => this.handleSubmit(e)}
									>
										Log in
									</Button>
								</form>

								<br />
								<br />

								<div>
									<Typography gutterBottom={true} variant="caption">
										Don't have an account? <Link to="/register">Sign up now!</Link>
									</Typography>
								</div>
								<div>
									<Typography gutterBottom={true} variant="caption">
										Forgot your <Link to="/forgot_password">password?</Link>
									</Typography>
								</div>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Login);
