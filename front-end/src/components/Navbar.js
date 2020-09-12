import {
	AppBar,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography
} from '@material-ui/core';
import React, { Fragment } from 'react';

import { Authenticator } from './Authentication/AuthenticatorContext';
import { Link } from 'react-router-dom';
import Logout from './Authentication/Logout';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	paper: {
		backgroundColor: '#181818',
		color: '#fff'
	},
	dividerColor: {
		backgroundColor: 'rgb(138, 3, 3)'
	}
}));

const Navbar = () => {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		open: false
	});

	const toggleDrawer = (side, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ backgroundColor: '#181818' }}>
				<Toolbar>
					<Authenticator.Consumer>
						{(props) => {
							if (props.isAuthorized) {
								return (
									<IconButton
										edge="start"
										className={classes.menuButton}
										onClick={toggleDrawer('open', true)}
										color="inherit"
										aria-label="menu"
									>
										<MenuIcon />
									</IconButton>
								);
							}
						}}
					</Authenticator.Consumer>

					<Typography variant="h6" className={classes.title}>
						<Authenticator.Consumer>
							{(props) => {
								if (props.isAuthorized) {
									return (
										<Fragment>
											<Link to="/user_dashboard" style={{ textDecoration: 'none' }} selected>
												<Button color="inherit">Dashboard</Button>
											</Link>
											<Link to="/map" style={{ textDecoration: 'none' }}>
												<Button color="secondary">Play</Button>
											</Link>
										</Fragment>
									);
								} else {
									return (
										<Link to="/" style={{ textDecoration: 'none' }}>
											<span style={{ fontFamily: 'Cinzel, sans-serif' }}>Imperial Dreams</span>
										</Link>
									);
								}
							}}
						</Authenticator.Consumer>
					</Typography>
					<Authenticator.Consumer>
						{(props) => {
							if (props.isAuthorized) {
								return (
									<div>
										<Logout />
										<Drawer
											anchor="left"
											open={state.open}
											onClose={toggleDrawer('open', false)}
											classes={{ paper: classes.paper }}
										>
											<List>
												<ListItem>
													<ListItemText>Settings</ListItemText>
												</ListItem>
												<Divider classes={{ root: classes.dividerColor }} />
												<Link
													to="/add_archetype"
													style={{ textDecoration: 'none' }}
													onClick={(e) => {
														setState('open', false);
													}}
												>
													<ListItem button>
														<ListItemIcon>
															<Settings style={{ color: '#fff' }} />
														</ListItemIcon>
														<ListItemText primary="Site Management" />
													</ListItem>
												</Link>
											</List>
										</Drawer>
									</div>
								);
							} else {
							}
						}}
					</Authenticator.Consumer>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export { Navbar };
