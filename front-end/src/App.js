import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import favicon from './images/favicon.ico';
import './App.css';
import ForgotPassword from './components/forgotPassword';
import ForgotUsername from './components/forgotUsername';
import Login from './components/login';
import Landing from './components/landing';
import Register from './components/register';

function App() {
	return (
		<div>
			<Router basename="imperial">
				<nav className="navbar navbar-expand-lg" id="custom-nav" style={{ backgroundColor: 'rgb(0, 51, 102)' }}>
					<a className="navbar-brand" href="/">
						<img src={favicon} height={35} alt="" />
					</a>
					<ul className="navbar-nav">
						<li className="nav-item active">
							<div className="nav-link" href="/">
								<Link to="/">Home</Link>
							</div>
						</li>
						<li className="nav-item">
							<div className="nav-link" href="/login">
								<Link to="/login">Login</Link>
							</div>
						</li>
					</ul>
				</nav>
				<div align="center">
					{/* Specify all routes in the client-side */}
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forgot_username" component={ForgotUsername} />
					<Route exact path="/forgot_password" component={ForgotPassword} />
				</div>
			</Router>
		</div>
	);
}

export default App;
