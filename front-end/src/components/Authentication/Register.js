import {
	Button,
	Card,
	CardContent,
	FormControl,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';

import EmailIcon from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';
import PasswordIcon from '@material-ui/icons/LockOpen';
import UserIcon from '@material-ui/icons/AccountCircle';
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

class Register extends Component {
	state = {
		username: null,
		email: null,
		password: '',
		userExists: false,
		usernameValid: true,
		passwordValid: true,
		repeatPasswordValid: true,
		userCreated: null,
		emailExists: false,
		emailValid: true
	};

	userSignup = () => {
		fetch('http://localhost:4000/api/user/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
				repeatPassword: this.state.repeatPassword
			})
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({
					userExists: res.userExists,
					usernameValid: res.usernameValid,
					passwordValid: res.passwordValid,
					repeatPasswordValid: res.repeatPasswordValid,
					userCreated: res.userCreated,
					emailExists: res.emailExists,
					emailValid: res.emailValid
				});
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
								Register Account
							</Typography>

							<CardContent
								style={{
									border: 'solid 15px rgb(138, 3, 3)',
									backgroundColor: '#181818',
									borderRadius: '25px'
								}}
							>
								<form>
									<FormControl margin="normal" style={{ width: '80%' }}>
										<InputLabel className={classes.root}>Email</InputLabel>
										<Input
											type="email"
											fullWidth={true}
											autoFocus={true}
											classes={{ underline: classes.underline, root: classes.root }}
											onChange={(e) => {
												this.setState({ email: e.target.value });
											}}
											endAdornment={<EmailIcon />}
										/>
										{!this.state.emailValid ? (
											<div className="animated fadeInUp">
												<FormHelperText error={true} variant="outlined">
													Please enter a valid email address.
												</FormHelperText>
											</div>
										) : (
											''
										)}
										{this.state.emailExists ? (
											<div className="animated fadeInUp">
												<FormHelperText error={true} variant="outlined">
													This email is already being used by another account
												</FormHelperText>
											</div>
										) : (
											''
										)}
									</FormControl>
									<FormControl margin="normal" style={{ width: '80%' }}>
										<InputLabel className={classes.root}>Username</InputLabel>
										<Input
											required={true}
											classes={{ underline: classes.underline, root: classes.root }}
											fullWidth={true}
											type="text"
											onChange={(e) => {
												this.setState({ username: e.target.value });
											}}
											endAdornment={<UserIcon />}
										/>
										{!this.state.usernameValid ? (
											<div className="animated fadeInUp">
												<FormHelperText error={true} variant="outlined">
													Username must be Alpha-numeric and over 8 characters long
												</FormHelperText>
											</div>
										) : (
											''
										)}
										{this.state.userExists ? (
											<div className="animated fadeInUp">
												<FormHelperText error={true} variant="outlined">
													This username already exists please try another
												</FormHelperText>
											</div>
										) : (
											''
										)}
									</FormControl>
									<FormControl margin="normal" style={{ width: '80%' }}>
										<InputLabel className={classes.root}>Password</InputLabel>
										<Input
											type="password"
											required={true}
											classes={{ underline: classes.underline, root: classes.root }}
											fullWidth={true}
											onChange={(e) => {
												this.setState({ password: e.target.value });
											}}
											endAdornment={<PasswordIcon />}
										/>

										{!this.state.passwordValid ? (
											<div className="animated fadeInUp">
												<FormHelperText error={true} variant="outlined">
													Password must be over 8 characters and contain a symbol, number and
													letter
												</FormHelperText>
											</div>
										) : (
											''
										)}
									</FormControl>
									{this.state.password > '' && (
										<FormControl margin="normal" style={{ width: '80%' }}>
											<InputLabel className={classes.root}>Repeat Password</InputLabel>
											<Input
												type="password"
												required={true}
												classes={{ underline: classes.underline, root: classes.root }}
												fullWidth={true}
												onChange={(e) => {
													this.setState({ repeatPassword: e.target.value });
												}}
												endAdornment={<PasswordIcon />}
											/>
											{!this.state.repeatPasswordValid ? (
												<div className="animated fadeInUp">
													<FormHelperText error={true} variant="outlined">
														Your passwords must match.
													</FormHelperText>
												</div>
											) : (
												''
											)}
										</FormControl>
									)}

									<br />
									<br />
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
									<br />
									<br />

									<div>
										<Typography gutterBottom={true} variant="caption">
											Have an account? <Link to="/login">Log in here!</Link>
										</Typography>
									</div>
									<div>
										<Typography gutterBottom={true} variant="caption">
											Forgot your <Link to="/forgot_password">password?</Link>
										</Typography>
									</div>
									<div align="right" />
								</form>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Register);
