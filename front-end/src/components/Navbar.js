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
						<Button color="inherit">
							<Link to="/">Imperial Dreams</Link>
						</Button>
					</Typography>
					<Authenticator.Consumer>
						{(props) => {
							if (props.isAuthorized) {
								return (
									<div>
										<Button color="inherit">
											<Link to="/user_dashboard">Dashboard</Link>
										</Button>
										<Button color="inherit">
											<Logout />
										</Button>
										<Drawer anchor="left" open={state.open} onClose={toggleDrawer('open', false)}>
											<List>
												<ListItem>
													<ListItemText>Administration</ListItemText>
												</ListItem>
												<Divider />
												<ListItem
													button
													onClick={() => {
														window.location.href = '/imperial/add_archetype';
													}}
												>
													<ListItemText>
														<ListItemIcon>
															<AddCircleIcon />
														</ListItemIcon>
														Add Archetype
													</ListItemText>
												</ListItem>
											</List>
										</Drawer>
									</div>
								);
							} else {
								return (
									<Button color="inherit">
										<Link to="/login">Login</Link>
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
