import { Fab, Grid, Paper } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import Chat from './Chat';
import ChatIcon from '@material-ui/icons/Chat';

const UserDashboard = () => {
	const [ showChat, setShowChat ] = useState(0);
	const fabFocused = {
		backgroundColor: 'rgb(138, 3, 3)',
		color: '#fff'
	};
	const fabUnfocused = {};

	return (
		<Fragment>
			{showChat ? (
				<div
					className="animated fadeInDown faster"
					style={{
						marginTop: 20
					}}
				>
					<Grid container spacing={0} justify={'center'}>
						<Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
							<Paper style={{ backgroundColor: 'rgba(18,18,18,.85)', marginTop: 50 }}>
								<Chat room={'General'} />
							</Paper>
						</Grid>
					</Grid>
				</div>
			) : (
				''
			)}

			<Grid container justify="flex-end">
				<Grid
					item
					xs={1}
					sm={1}
					md={1}
					lg={1}
					xl={1}
					style={{
						textAlign: 'center',
						position: 'fixed',
						bottom: 25,
						right: 25
					}}
				>
					<Fab
						size="large"
						onClick={() => {
							if (showChat) {
								setShowChat(false);
							} else {
								setShowChat(true);
							}
						}}
						style={showChat == true ? fabFocused : fabUnfocused}
					>
						<ChatIcon />
					</Fab>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default UserDashboard;
