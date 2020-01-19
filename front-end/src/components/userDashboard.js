import { Grid, Paper } from '@material-ui/core';

import Chat from './chat';
import React from 'react';
import { withCookies } from 'react-cookie';

const UserDashboard = () => {
	return (
		<div
			className="container animated fadeInDown faster"
			style={{
				marginTop: 10
			}}
		>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Paper style={{ backgroundColor: '#121212' }}>
						<Chat room={'ImperialDreams1'} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default withCookies(UserDashboard);
