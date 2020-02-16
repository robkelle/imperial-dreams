import { AppBar, Dialog, Fab, Grid, IconButton, Paper, Toolbar } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import { Character } from './Character/Character';
import Chat from './Chat/Chat';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';

const UserDashboard = () => {
	const [ open, setOpen ] = useState(0);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div style={{ backgroundColor: 'rgba(24,24,24, 0.7)' }}>
			<Fragment>
				<Character />
				{open ? (
					<Dialog
						open={open}
						fullScreen={true}
						fullWidth={true}
						PaperProps={{
							style: {
								backgroundColor: 'transparent',
								boxShadow: 'none'
							}
						}}
					>
						<AppBar>
							<Toolbar style={{ backgroundColor: 'rgb(18,18,18)' }} />
						</AppBar>
						<div
							className="animated fadeInDown faster"
							style={{
								marginTop: 20
							}}
						>
							<Grid container spacing={0} justify={'center'}>
								<Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
									<Paper style={{ backgroundColor: 'rgb(18,18,18)', marginTop: 100 }}>
										<Chat
											room={'General'}
											exit={
												<IconButton
													edge="start"
													aria-label="close"
													onClick={handleClose}
													style={{ color: '#fff' }}
												>
													<CloseIcon />
												</IconButton>
											}
										/>
									</Paper>
								</Grid>
							</Grid>
						</div>
					</Dialog>
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
								if (open) {
									setOpen(false);
								} else {
									setOpen(true);
								}
							}}
							style={{ backgroundColor: 'rgb(138, 3, 3)', color: '#fff' }}
						>
							<ChatIcon />
						</Fab>
					</Grid>
				</Grid>
			</Fragment>
		</div>
	);
};

export default UserDashboard;
