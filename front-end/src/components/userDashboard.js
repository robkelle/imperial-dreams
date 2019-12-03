import React, { Component } from 'react';

import BorderBackground from '../images/borderBackground.jpg';
import DashboardImage from '../images/dashboardTop.png';
import config from '../config.json';
import io from 'socket.io-client';
import { withCookies } from 'react-cookie';

const classes = {
	row: {
		paddingTop: 10
	},
	colStyle: {
		backgroundColor: 'rgb(0, 51, 102)',
		color: '#BEBEBE',
		padding: 0,
		borderRadius: '25px',
		backgroundImage: `url(${BorderBackground})`,
		margin: 10
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%'
	},
	header: {
		position: 'absolute',
		left: 45,
		top: 6,
		fontFamily: 'Trade Winds',
		color: 'rgb(255, 180, 59)'
	}
};

class UserDashboard extends Component {
	state = {
		announcements: ''
	};
	componentDidMount() {
		const { cookies } = this.props;
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/user/verify`, {
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
				if (res.httpStatus === 401) {
					cookies.remove('isAuthorized', { path: '/' });
				}
			});

		var socket = io('http://localhost:8080');
		// socket.on('announcements', (result) => {
		// 	this.setState({ announcements: result.message });
		// });

		socket.emit('addNews', { message: 'Hello World' });
	}

	render() {
		return (
			<div
				className="container"
				style={{
					backgroundColor: 'rgb(0, 51, 102)',
					padding: 25,
					marginTop: 10,
					borderImage: `url(${BorderBackground}) 30 round`,
					borderWidth: '25px',
					borderStyle: 'solid'
				}}
			>
				<div className="row" style={classes.row}>
					<div className="col-6" style={classes.colStyle}>
						<h5 style={classes.header}>NEWS</h5>

						<img src={DashboardImage} style={classes.image} alt="" />
						<div style={{ padding: 20 }}>{this.state.announcements}</div>
					</div>

					<div className="col-4" style={classes.colStyle}>
						<h5 style={classes.header}>EVENTS</h5>
						<img src={DashboardImage} style={classes.image} alt="" />
						<div style={{ padding: 20 }}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book.
						</div>
					</div>
				</div>
				<div className="row" style={classes.row}>
					<div className="col-6" style={classes.colStyle}>
						<h5 style={classes.header}>ASSOCIATED PRESS</h5>

						<img src={DashboardImage} style={classes.image} alt="" />
						<div style={{ padding: 20 }}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book. It has survived not only five
							centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
							passages, and more recently with desktop publishing software like Aldus PageMaker including
							versions of Lorem Ipsum.
						</div>
					</div>

					<div className="col-4" style={classes.colStyle}>
						<h5 style={classes.header}>AGENDA</h5>

						<img src={DashboardImage} style={classes.image} alt="" />
						<div style={{ padding: 20 }}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book.
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withCookies(UserDashboard);
