import { Grid, Paper } from '@material-ui/core';

import Chat from './Chat';
import React from 'react';

const UserDashboard = () => {
	return (
		<div
			className="container animated fadeInDown faster"
			style={{
				marginTop: 20
			}}
		>
			<Grid container spacing={0} justify={'center'}>
				<Grid item xs={6}>
					<Paper style={{ backgroundColor: 'rgba(18,18,18,.85)', marginTop: 50 }}>
						<Chat room={'ImperialDreams1'} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default UserDashboard;
