import '../App.css';

import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import Authenticator from './Authentication/AuthenticatorContext';
import { Link } from 'react-router-dom';

const classes = {
	paragraph: {
		color: 'white',
		fontFamily: 'Cinzel, sans-serif',
		padding: '40px 7px 7px 7px'
	},
	role: {
		fontFamily: 'Trade Winds',
		color: 'rgb(217, 217, 217)',
		fontSize: '33px',
		padding: '30px 0px 30px 0px'
	}
};
class ChangingText extends Component {
	constructor() {
		super();
		this.state = { textIdx: 0 };
		this.messages = [
			'A Merchant',
			'A Bandit',
			'An Assasin',
			'A King ',
			'An Empress',
			'A Priest',
			'A Tailor',
			'A Pirate',
			'A Captain',
			'A Mayor',
			'A Duchess',
			'A god'
		];
	}
	componentDidMount() {
		this.timeout = setInterval(() => {
			this.setState({ textIdx: this.state.textIdx + 1 });
		}, this.props.textTimeout);
	}
	componentWillUnmount() {
		clearInterval(this.timeout);
	}
	render() {
		let textThatChanges = this.messages[this.state.textIdx % this.messages.length];
		return textThatChanges;
	}
}
const Landing = (props) => {
	let summary =
		'The continent of Acar is in tatters. A multi-generational war to exterminate the gods broke the world asunder. Society, culture and knowledge faded in the centuries following the apocalypse, with the world reverting back to its primeval origins. The land of Acar is a blank slate. Its history, cultures, religions and institutions will be formed at the hands of the characters that inhabit it.';
	return (
		<div align="center" className="animated fadeInDown faster">
			<Grid container={true} justify={'center'}>
				<Grid item={true} xs={12} sm={12} md={6} lg={5} xl={5}>
					<Card
						style={{
							backgroundColor: 'rgba(24, 24, 24, .85)',
							marginTop: 50,
							padding: '25px 35px 60px 35px',
							borderRadius: '25px'
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
							IMPERIAL DREAMS
						</Typography>
						<CardContent
							style={{
								border: 'solid 15px rgb(138, 3, 3)',
								backgroundColor: '#181818',
								borderRadius: '25px'
							}}
						>
							<Typography style={classes.paragraph}>{summary}</Typography>
							<Typography style={classes.paragraph}>
								You will start as nothing, but what will you become?
							</Typography>
							<Typography style={classes.role}>
								<ChangingText textTimeout={2500} /> ?
							</Typography>
							<Authenticator.Consumer>
								{(props) => {
									if (!props.isAuthorized) {
										return (
											<Link to="/login" style={{ textDecoration: 'none' }}>
												<Button
													style={{
														backgroundColor: 'rgb(217, 217, 217)',
														color: '#181818',
														width: 160
													}}
												>
													Play Now!
												</Button>
											</Link>
										);
									}
								}}
							</Authenticator.Consumer>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};
export { Landing };
