import { AppBar, Drawer, Fab, Grid, IconButton, Paper, Toolbar } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import { Character } from './Character/Character';
import Chat from './Chat/Chat';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: '#181818',
		color: '#fff',
		width: 600,
		marginLeft: 'auto',
		marginRight: 0
	}
}));

const UserDashboard = (props) => {
	const [ open, setOpen ] = useState(0);
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Fragment>
				<Character cookies={props.cookies} />
				{open ? (
					<Drawer open={open} onClose={handleClose} anchor="bottom" classes={{ paper: classes.paper }}>
						<AppBar>
							<Toolbar style={{ backgroundColor: 'rgb(18,18,18)' }} />
						</AppBar>
						<div className="animated fadeInDown faster">
							<Grid container spacing={0} justify="flex-end">
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<Paper style={{ backgroundColor: 'rgb(18,18,18)' }}>
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
					</Drawer>
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
