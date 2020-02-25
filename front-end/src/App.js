// Exported by the imports.js file

import {
	AddArchetype,
	BorderBackground,
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
} from './components/Imports';

import { Authenticator } from './components/Authentication/AuthenticatorContext';

const classes = {
	main: {
		borderRadius: '25px',
		backgroundImage: `url(${BorderBackground})`,
		width: 600,
		padding: '25px 35px 60px 35px',
		marginTop: 10
	},
	formStyle: {
		backgroundColor: 'rgba(0, 51, 102, .85)',
		padding: '10px 35px 60px 35px',
		color: '#BEBEBE',
		marginTop: 10,
		width: 500,
		fontSize: 16,
		borderStyle: 'solid',
		borderColor: 'rgb(255, 180, 59)',
		borderWidth: '15px',
		borderRadius: '25px'
	},
	labelStyle: {
		fontFamily: 'Trade Winds',
		color: 'rgb(255, 180, 59)',
		fontSize: '44px'
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
		color: '#fff',
		width: 160
	}
};

function App(props) {
	const handleAuth = { isAuthorized: props.cookies.get('isAuthorized') };

	return (
		<div>
			<Router basename="imperial">
				<Authenticator.Provider value={handleAuth}>
					<Navbar />
					{/* Initialize all routes */}

					<Route exact path="/" component={() => <Landing />} />

					<Route
						exact
						path="/login"
						component={(e) => <Login history={e.history} cookies={props.cookies} />}
					/>
					<Route exact path="/register" component={(e) => <Register style={classes} history={e.history} />} />
					<Route exact path="/forgot_password" component={() => <ForgotPassword style={classes} />} />
					<Route
						exact
						path="/reset_password"
						component={(e) => <ResetPassword style={classes} location={e.location} />}
					/>
					<Route exact path="/loading" component={(e) => <LoadingScreen history={e.history} />} />

					<Route
						exact
						path="/user_dashboard"
						render={(e) =>
							handleAuth.isAuthorized ? (
								<UserDashboard />
							) : (
								<Login history={e.history} cookies={props.cookies} />
							)}
					/>

					<Route
						exact
						path="/add_archetype"
						render={(e) =>
							handleAuth.isAuthorized ? (
								<AddArchetype />
							) : (
								<Login history={e.history} cookies={props.cookies} />
							)}
					/>
				</Authenticator.Provider>
			</Router>
		</div>
	);
}

export default withCookies(App);
