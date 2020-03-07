import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import config from '../../config.json';
import { withCookies } from 'react-cookie';

class Logout extends Component {
	handleClick = () => {
		const { cookies } = this.props;

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/logout`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.isLoggedIn === false) {
					cookies.remove('isAuthorized', { path: '/' });
				}
			});
	};

	render() {
		return (
			<Button color="inherit" onClick={this.handleClick} style={{ backgroundColor: 'rgb(138, 3, 3)' }}>
				<Link to="/" style={{ textDecoration: 'none' }}>
					Logout
				</Link>
			</Button>
		);
	}
}

export default withCookies(Logout);
