import { Button, Card, CardContent, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PasswordIcon from '@material-ui/icons/LockOpen';
import config from '../../config.json';
import queryString from 'query-string';
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
							<Typography variant="caption" gutterBottom>
								<Link to="/login">Back to Login</Link>
							</Typography>
							<br />
							<br />
							<Typography
								gutterBottom
								variant="h4"
								align="center"
								style={{
									fontFamily: 'Trade Winds',
									color: 'rgb(217, 217, 217)'
								}}
							>
								Reset Password
							</Typography>

							<CardContent
								style={{
									border: 'solid 15px rgb(138, 3, 3)',
									backgroundColor: '#181818',
									borderRadius: '25px'
								}}
							>
								<form>
									<Typography gutterBottom variant="overline" color="initial">
										Please choose your new password
									</Typography>

									<FormControl margin="normal" style={{ width: '75%' }}>
										<InputLabel className={classes.root}>New Password</InputLabel>
										<Input
											type="password"
											classes={{ underline: classes.underline, root: classes.root }}
											required={true}
											fullWidth={true}
											autoFocus={true}
											onChange={(e) => {
												this.setState({ password: e.target.value });
											}}
											endAdornment={<PasswordIcon />}
										/>
									</FormControl>
									<FormControl margin="normal" style={{ width: '75%' }}>
										<InputLabel className={classes.root}>Confirm Password</InputLabel>
										<Input
											type="password"
											classes={{ underline: classes.underline, root: classes.root }}
											required={true}
											fullWidth={true}
											autoFocus={true}
											onChange={(e) => {
												this.setState({ confirmPassword: e.target.value });
											}}
											endAdornment={<PasswordIcon />}
										/>
									</FormControl>
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
										Save
									</Button>
								</form>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(ResetPassword);
