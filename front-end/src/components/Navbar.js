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

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Authenticator } from './Authentication/AuthenticatorContext';
import { Link } from 'react-router-dom';
import Logout from './Authentication/Logout';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
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
					<IconButton
						edge="start"
						className={classes.menuButton}
						onClick={toggleDrawer('open', true)}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Authenticator.Consumer>
							{(props) => {
								if (props.isAuthorized) {
									return (
										<Button color="inherit">
											<Link to="/user_dashboard" style={{ textDecoration: 'none' }}>
												Dashboard
											</Link>
										</Button>
									);
								} else {
									return (
										<Button color="inherit">
											<Link to="/" style={{ textDecoration: 'none' }}>
												Imperial Dreams
											</Link>
										</Button>
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
										<Button color="inherit" style={{ backgroundColor: 'rgb(138, 3, 3)' }}>
											<Logout />
										</Button>
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
												<ListItem button>
													<Link to="/add_archetype" style={{ textDecoration: 'none' }}>
														<ListItemText>
															<ListItemIcon>
																<AddCircleIcon style={{ color: '#fff' }} />
															</ListItemIcon>
															Add Archetype
														</ListItemText>
													</Link>
												</ListItem>
											</List>
										</Drawer>
									</div>
								);
							} else {
								return (
									<Button color="inherit" style={{ backgroundColor: 'rgb(138, 3, 3)' }}>
										<Link to="/login" style={{ textDecoration: 'none' }}>
											Login
										</Link>
									</Button>
								);
							}
						}}
					</Authenticator.Consumer>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export { Navbar };
