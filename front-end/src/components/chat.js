import React, { Component } from 'react';

import { Avatar } from '@material-ui/core';
import Gif from '../images/gif.png';
import InfiniteScroll from 'react-infinite-scroller';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Picker from 'react-giphy-component';
import config from '../config.json';
import io from 'socket.io-client';
import { withCookies } from 'react-cookie';

const ConstructGifMessage = (props) => {
	return (
		<List>
			<ListItem style={props.style}>
				<ListItemAvatar>
					<Avatar>{props.user.substring(0, 2)}</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={<img src={props.message} alt="" />}
					secondary={`${props.user} posted on ${props.posted}`}
				/>
			</ListItem>
		</List>
	);
};

const ConstructMessage = (props) => {
	return (
		<List>
			<ListItem style={props.style}>
				<ListItemAvatar>
					<Avatar>{props.user.substring(0, 2)}</Avatar>
				</ListItemAvatar>
				<ListItemText primary={props.message} secondary={`${props.user} posted on ${props.posted}`} />
			</ListItem>
		</List>
	);
};

class Chat extends Component {
	constructor() {
		super();
		this.socket = io('http://localhost:4000');
		this._isMounted = false;
		this.classes = {
			messageStyleSpan: {
				borderRadius: 10,
				backgroundColor: '#343D47',
				color: '#BDC0C4',
				margin: 10
			}
		};
		this.initialLoad = true;
		this.hasMore = true;
		this.state = {
			messages: null,
			addMessage: null,
			displayGif: false,
			page: 0,
			pageLimit: 10,
			hasMoreItems: true
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
		this.socket.emit('addMessage', {
			message: message,
			username: cookies.get('user'),
			messageType: type,
			page: this.state.page,
			pageLimit: this.state.pageLimit
		});
		this.setState({ addMessage: '' });

		let count = 0;
		this.socket.on('refresh', (res) => {
			count = count + 1;

			if (count > 1) {
			} else {
				this.setState({
					messages: res.message.map((value, index) => {
						if (value.messageType === 'gif') {
							return (
								<div key={index}>
									<ConstructGifMessage
										message={value.message}
										posted={value.posted}
										user={value.username}
										style={this.classes.messageStyleSpan}
									/>
								</div>
							);
						} else {
							return (
								<div key={index}>
									<ConstructMessage
										message={value.message}
										posted={value.posted}
										user={value.username}
										style={this.classes.messageStyleSpan}
									/>
								</div>
							);
						}
					})
				});
			}
		});
	};

	loadItems = () => {
		let count = 0;
		this.socket.emit('load', { load: true, page: this.state.page, pageLimit: this.state.pageLimit });
		this.socket.on('refresh', (res) => {
			if (res.message.length !== 0) {
				count = count + 1;

				if (count > 1) {
				} else {
					console.log(res.message);
					this.hasMore = true;
					this.setState({
						messages: res.message.map((value, index) => {
							if (value.messageType === 'gif') {
								return (
									<div key={index}>
										<ConstructGifMessage
											message={value.message}
											posted={value.posted}
											user={value.username}
											style={this.classes.messageStyleSpan}
										/>
									</div>
								);
							} else {
								return (
									<div key={index}>
										<ConstructMessage
											message={value.message}
											posted={value.posted}
											user={value.username}
											style={this.classes.messageStyleSpan}
										/>
									</div>
								);
							}
						})
					});

					this.setState({
						page: this.state.page + 1
					});
				}
			} else {
				this.setState({
					hasMoreItems: false
				});
			}
		});
	};

	// Life cycle components
	componentDidMount() {
		const { cookies } = this.props;
		this.initialLoad = false;

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

		let count = 0;
		// Load all existing chats
		this.socket.emit('load', { load: true, page: this.state.page, pageLimit: this.state.pageLimit });
		this.socket.on('refresh', (res) => {
			count = count + 1;

			if (count > 1) {
			} else {
				this.setState({
					messages: res.message.map((value, index) => {
						if (value.messageType === 'gif') {
							return (
								<div key={index}>
									<ConstructGifMessage
										message={value.message}
										posted={value.posted}
										user={value.username}
										style={this.classes.messageStyleSpan}
									/>
								</div>
							);
						} else {
							return (
								<div key={index}>
									<ConstructMessage
										message={value.message}
										posted={value.posted}
										user={value.username}
										style={this.classes.messageStyleSpan}
									/>
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
		this.hasMore = false;
	}

	render() {
		const loader = (
			<div className="loader" style={{ height: '100px' }}>
				Loading ...
			</div>
		);

		console.log(this.state.page);

		return (
			<div>
				<div style={{ padding: 20, marginBottom: 30 }}>
					<div className="overflow-auto side-bar" style={{ height: 500, overflow: 'auto' }}>
						<InfiniteScroll
							pageStart={0}
							threshold={250}
							useWindow={false}
							initialLoad={this.initialLoad}
							loadMore={this.loadItems}
							isReverse={true}
							hasMore={this.hasMore}
							loader={loader}
						>
							{this.state.messages}
						</InfiniteScroll>
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
							style={{ backgroundColor: '#343D47' }}
						>
							<img src={Gif} height="25px" alt="" />
						</button>
					</div>
				</div>
				<div align="right">{this.state.displayGif ? <Picker onSelected={this.gifyLoader} /> : ''}</div>
			</div>
		);
	}
}

export default withCookies(Chat);
