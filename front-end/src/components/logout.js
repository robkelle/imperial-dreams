import React, { Component } from 'react';
import config from '../config.json';
import { withCookies } from 'react-cookie';
import buttonBackground from '../images/buttonBackground.jpg';

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
					cookies.remove('loggedInUser', { path: '/' });
				}
			});
	};

	render() {
		return (
			<button
				onClick={this.handleClick}
				style={{
					backgroundImage: `url(${buttonBackground})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					color: '#BEBEBE',
					width: 160
				}}
			>
				Logout
			</button>
		);
	}
}

export default withCookies(Logout);
