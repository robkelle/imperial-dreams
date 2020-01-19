import { Grid, Paper } from '@material-ui/core';

import BorderBackground from '../images/borderBackground.jpg';
import Chat from './chat';
import React from 'react';
import { withCookies } from 'react-cookie';

const classes = {
	row: {
		paddingTop: 10
	},
	colStyle: {
		backgroundColor: 'rgb(255, 255, 255)',
		color: '#BEBEBE',
		padding: 0,
		//backgroundImage: `url(${BorderBackground})`,
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

const UserDashboard = (props) => {
	return (
		<div
			className="container animated fadeInDown faster"
			style={{
				marginTop: 10
			}}
		>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Paper>
						<Chat room={'ImperialDreams1'} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default withCookies(UserDashboard);
