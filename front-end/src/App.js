import React from 'react';
import Login from './components/login';
import Landing from './components/landing';
import { HashRouter, Route, Link } from 'react-router-dom';
import favicon from './images/favicon.ico';

import './App.css';

function App() {
	return (
		<div>
			<HashRouter>
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
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
				</div>
			</HashRouter>
		</div>
	);
}

export default App;
