import BorderBackground from '../images/borderBackground.jpg';
import Chat from './chat';
import React from 'react';

const classes = {
	row: {
		paddingTop: 10
	},
	colStyle: {
		backgroundColor: 'rgb(0, 51, 102)',
		color: '#BEBEBE',
		padding: 0,
		backgroundImage: `url(${BorderBackground})`,
		margin: 0
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%'
	},
	header: {
		position: 'absolute',
		left: 45,
		top: 0,
		fontFamily: 'Trade Winds',
		color: '#E6E8EA'
	}
};

const UserDashboard = () => {
	return (
		<div
			className="container animated fadeInDown faster"
			style={{
				backgroundColor: 'rgb(0, 51, 102)',
				padding: 35,
				marginTop: 10,
				borderImage: `url(${BorderBackground}) 30 round`,
				borderWidth: '25px',
				borderStyle: 'solid'
			}}
		>
			<div className="row" style={classes.row}>
				<div className="col-12" style={classes.colStyle}>
					<h1 style={classes.header}>CHAT</h1>
					<div style={{ backgroundColor: '#485563', height: 50 }} />
					<Chat />
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
