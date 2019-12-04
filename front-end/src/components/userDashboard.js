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
		color: '#E6E8EA'
	}
};

// Initiate socket.io
const socket = io('http://localhost:4000');

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

		socket.emit('load', 'load');
		socket.on('refresh', (res) => {
			this.setState({
				announcements: res.message.map((value, index) => (
					<div key={index}>
						<strong>{value.username}: </strong>
						{value.message}
					</div>
				))
			});
		});
	}

	addMessage = (message) => {
		const { cookies } = this.props;
		socket.emit('addMessage', { message: message, username: cookies.get('user') });
		this.setState({ message: '' });

		socket.on('refresh', (res) => {
			this.setState({
				announcements: res.message.map((value, index) => (
					<div key={index}>
						<strong>{value.username}: </strong>
						{value.message}
					</div>
				))
			});
		});
	};

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
					<div className="col-11" style={classes.colStyle}>
						<h1 style={classes.header}>CHAT</h1>

						<div style={{ backgroundColor: '#485563', height: 50 }} />
						<div className="overflow-auto side_bar" style={{ overflow: 'visible', height: 150 }}>
							<div style={{ padding: 20, marginBottom: 30 }}>{this.state.announcements}</div>
						</div>

						<div className="input-group">
							<div className="input-group-prepend">
								<button
									className="btn btn-outline-secondary"
									type="button"
									onClick={() => this.addMessage(this.state.message)}
								>
									Post
								</button>
							</div>
							<input
								type="text"
								className="form-control"
								placeholder=""
								aria-label=""
								aria-describedby="basic-addon1"
								value={this.state.message || ''}
								onChange={(e) => {
									this.setState({ message: e.target.value });
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withCookies(UserDashboard);
