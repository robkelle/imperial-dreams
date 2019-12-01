// Exported by the imports.js file

import {
	ButtonBackground,
	ForgotPassword,
	Landing,
	LoadingScreen,
	Login,
	Navbar,
	React,
	Register,
	ResetPassword,
	Route,
	Router,
	UserDashboard,
	withCookies
} from './components/imports';

const classes = {
	formStyle: {
		backgroundColor: 'rgba(0, 51, 102, .85)',
		padding: '10px 35px 60px 35px',
		color: '#BEBEBE',
		marginTop: 10,
		width: 500,
		fontSize: 16
	},
	hrStyle: {
		borderTop: '1px solid #fff',
		color: '#fff'
	},
	liStyle: {
		listStyleType: 'none',
		color: 'red'
	},
	buttonStyle: {
		backgroundImage: `url(${ButtonBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		color: '#BEBEBE',
		width: 160
	}
};

function App(props) {
	const isAuthorized = props.cookies.get('isAuthorized');

	return (
		<div>
			<Router basename="imperial">
				<Navbar isAuthorized={isAuthorized} />
				{/* Initialize all routes */}
				<Route exact path="/" component={() => <Landing isAuthorized={isAuthorized} />} />
				<Route exact path="/login" component={(e) => <Login style={classes} history={e.history} />} />
				<Route exact path="/register" component={() => <Register style={classes} />} />
				<Route exact path="/forgot_password" component={() => <ForgotPassword style={classes} />} />
				<Route
					exact
					path="/reset_password"
					component={(e) => <ResetPassword style={classes} location={e.location} />}
				/>
				<Route exact path="/loading" component={(e) => <LoadingScreen history={e.history} />} />
				<Route exact path="/user_dashboard" render={() => (isAuthorized ? <UserDashboard /> : <Login />)} />
			</Router>
		</div>
	);
}

export default withCookies(App);
