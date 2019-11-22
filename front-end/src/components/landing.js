import '../App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import buttonBackground from '../images/buttonBackground.jpg';

const classes = {
	summaryStyle: {
		display: 'inline-block',
		borderRadius: '25px',
		backgroundColor: 'rgb(0, 51, 102, .75)',
		padding: '25px 35px 60px 35px',
		color: '#BEBEBE',
		marginTop: 10,
		width: '800px',
		height: '800px'
	},
	labelStyle: {
		fontFamily: 'Trade Winds',
		color: 'rgb(255, 180, 59)',
		fontSize: '44px'
	},
	box: {
		backgroundColor: 'rgb(0, 51, 102',
		width: '650px',
		borderStyle: 'solid',
		borderColor: 'rgb(255, 180, 59)',
		borderWidth: '15px',
		height: '640px',
		borderRadius: '25px'
	},
	centered: {
		display: 'inline-block',
		textAlign: 'center',
		padding: '0px 0px 0px 0px'
	},
	paragraph: {
		color: 'white',
		fontFamily: 'Cinzel, sans-serif',
		fontSize: '20px',
		padding: '40px 7px 7px 7px'
	},
	role: {
		fontFamily: 'Trade Winds',
		color: 'rgb(255, 180, 59)',
		fontSize: '33px',
		padding: '30px 0px 30px 0px'
	},

	buttonStyle: {
		backgroundImage: `url(${buttonBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		color: '#BEBEBE',
		width: 160,
		borderRadius: '5px',
		padding: '4px 0px 4px 0px'
	},
	loginText: {
		color: 'white',
		textDecoration: 'none'
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
		<div>
			{props.isAuthorized ? <h1 style={{ color: '#fff' }}>Welcome {props.loggedInUser}!!</h1> : ''}
			<div style={classes.summaryStyle}>
				<h1 style={classes.labelStyle}>IMPERIAL DREAMS</h1>
				<div style={classes.centered}>
					<div style={classes.box}>
						<p style={classes.paragraph}>{summary}</p>
						<p style={classes.paragraph}>You will start as nothing, but what will you become?</p>
						<p style={classes.role}>
							<ChangingText textTimeout={2500} /> ?
						</p>
						<Link style={classes.loginText} to="/register">
							<button style={classes.buttonStyle}>Play Now!</button>{' '}
						</Link>{' '}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Landing;
