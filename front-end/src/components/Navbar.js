import AppBar from '@material-ui/core/AppBar';
import { Authenticator } from './Authentication/AuthenticatorContext';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Logout from './Authentication/Logout';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ backgroundColor: '#181818' }}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
