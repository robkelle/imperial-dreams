import { Button, Card, CardContent, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import EmailIcon from '@material-ui/icons/MailOutline';
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

const ForgotPassword = (props) => {
	// Set React Hooks
	const [ email, setEmail ] = useState();
	const { classes } = props;

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
							Forgot Password
						</Typography>

						<CardContent
							style={{
								border: 'solid 15px rgb(138, 3, 3)',
								backgroundColor: '#181818',
								borderRadius: '25px'
							}}
						>
							<form>
								<Typography gutterBottom variant="caption">
									Send a link to your email to reset your password
								</Typography>

								<FormControl margin="normal" style={{ width: '75%' }}>
									<InputLabel className={classes.root}>Email</InputLabel>
									<Input
										type="email"
										classes={{ underline: classes.underline, root: classes.root }}
										required={true}
										fullWidth={true}
										autoFocus={true}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										endAdornment={<EmailIcon />}
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
									onClick={(e) => handleSubmit(e)}
								>
									Send
								</Button>
							</form>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default withStyles(styles)(ForgotPassword);
