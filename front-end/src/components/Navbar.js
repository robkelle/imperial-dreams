import Favicon from '../images/favicon.ico';
import { Link } from 'react-router-dom';
import Logout from './Authorization/Logout';
import React from 'react';

const Navbar = (props) => {
	const { isAuthorized } = props;
	return (
		<nav className="navbar navbar-expand-lg" id="custom-nav" style={{ backgroundColor: 'rgb(0, 51, 102)' }}>
			<a className="navbar-brand" href="/imperial">
				<img src={Favicon} height={35} alt="" />
			</a>
			<ul className="navbar-nav">
				<li className="nav-item active">
					<div className="nav-link" href="/">
						<Link to="/">Home</Link>
					</div>
				</li>
				{!isAuthorized ? (
					<li className="nav-item">
						<div className="nav-link" href="/login">
							<Link to="/login">Login</Link>
						</div>
					</li>
				) : (
					<li className="nav-item">
						<div className="nav-link" href="/login">
							<Link to="/user_dashboard">Dashboard</Link>
						</div>
					</li>
				)}
			</ul>
			{isAuthorized ? (
				<ul className="nav navbar-nav ml-auto">
					<li className="nav-item">
						<div className="nav-link" href="/login">
							<Logout />
						</div>
					</li>
				</ul>
			) : (
				''
			)}
		</nav>
	);
};

export { Navbar };
