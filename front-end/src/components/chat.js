import React, { Component } from 'react';

import GIF from '../images/gif.png';
import Picker from 'react-giphy-component';
import config from '../config.json';
import io from 'socket.io-client';
import { withCookies } from 'react-cookie';

class Chat extends Component {
	constructor() {
		super();
		this.socket = io('http://localhost:4000');
		this._isMounted = false;
		this.classes = {
			messageStyle: {
				margin: 10
			}
		};
		this.state = {
			messages: null,
			addMessage: null,
			displayGif: false
		};
	}

	// Event handling
	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.addMessage(this.state.addMessage);
		}
	};

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	};

	// Actions

	gifyLoader = (gif) => {
		if (gif) {
			this.addMessage(gif.fixed_height.url, 'gif');
			this.setState({
				displayGif: false
			});
		}
	};

	addMessage = (message, type) => {
		const { cookies } = this.props;
		this.socket.emit('addMessage', { message: message, username: cookies.get('user'), messageType: type });
		this.setState({ addMessage: '' });

		// Post chat message and refresh from server
		this.socket.on('refresh', (res) => {
			this.setState({
				messages: res.message.map((value, index) => {
					if (value.messageType === 'gif') {
						return (
							<div key={index} style={this.classes.messageStyle}>
								<strong>{value.username}: </strong>
								<img src={value.message} alt="" />
							</div>
						);
					} else {
						return (
							<div key={index} style={this.classes.messageStyle}>
								<strong>{value.username}: </strong>
								{value.message}
							</div>
						);
					}
				})
			});
		});
	};

	// Life cycle components
	componentDidMount() {
		const { cookies } = this.props;
		this._isMounted = true;

		// Verify that the user is authenticated
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

		// Load all existing chats
		this.socket.emit('load', 'load');
		this.socket.on('refresh', (res) => {
			if (this._isMounted) {
				this.setState({
					messages: res.message.map((value, index) => {
						if (value.messageType === 'gif') {
							return (
								<div key={index} style={this.classes.messageStyle}>
									<strong>{value.username}: </strong>
									<img src={value.message} alt="" />
								</div>
							);
						} else {
							return (
								<div key={index} style={this.classes.messageStyle}>
									<strong>{value.username}: </strong>
									{value.message}
								</div>
							);
						}
					})
				});
			}
		});
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div>
				<div className="overflow-auto side-bar" style={{ overflow: 'visible', height: 500 }}>
					<div style={{ padding: 20, marginBottom: 30 }}>
						{this.state.messages}
						<div
							style={{ float: 'left', clear: 'both' }}
							ref={(el) => {
								this.messagesEnd = el;
							}}
						/>
					</div>
				</div>

				<div className="input-group">
					<div className="input-group-prepend">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={() => this.addMessage(this.state.addMessage)}
						>
							Post
						</button>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Type a message"
						aria-label=""
						aria-describedby="basic-addon1"
						value={this.state.addMessage || ''}
						onChange={(e) => {
							this.setState({ addMessage: e.target.value });
						}}
						onKeyDown={this.handleKeyDown}
					/>
					<div className="input-group-prepend">
						<button
							className="btn btn-secondary"
							type="button"
							onClick={() => this.setState({ displayGif: true })}
						>
							<img src={GIF} height="25px" alt="" />
						</button>
					</div>
				</div>
				<div align="right">{this.state.displayGif ? <Picker onSelected={this.gifyLoader} /> : ''}</div>
			</div>
		);
	}
}

export default withCookies(Chat);
