import {
	Avatar,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';

import Gif from '../images/gif.png';
import InfiniteScroll from 'react-infinite-scroller';
import Moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Picker from 'react-giphy-component';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
import config from '../config.json';
import io from 'socket.io-client';
import { withCookies } from 'react-cookie';

const ChatGIFMessage = (props) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12}>
				<Paper style={props.style} elevation={5}>
					<List>
						<ListItem>
							<ListItemAvatar>
								<Avatar>{props.user.substring(0, 1).toUpperCase()}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={<img src={props.message} alt="" />}
								secondary={`${props.user} posted on ${Moment(props.posted).format('llll')}`}
							/>
						</ListItem>
					</List>
				</Paper>
			</Grid>
		</Grid>
	);
};

const ChatMessage = (props) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12}>
				<Paper style={props.style} elevation={10}>
					<List>
						<ListItem>
							<ListItemAvatar>
								<Avatar>{props.user.substring(0, 1).toUpperCase()}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={props.message}
								secondary={`${props.user} posted on ${Moment(props.posted).format('llll')}`}
							/>
						</ListItem>
					</List>
				</Paper>
			</Grid>
		</Grid>
	);
};

class Chat extends Component {
	constructor() {
		super();
		this.socket = io('http://localhost:4000');
		this._isMounted = false;
		this.chatColor = 'rgba(0, 51, 102)';
		this.classes = {
			messageStyleSpanPersonal: {
				backgroundColor: this.chatColor /*'#6B6BE9' OR #8a0303,*/,
				color: '#fff'
			},
			messageStyleSpan: {
				backgroundColor: '#D8DAE0',
				color: '#000'
			}
		};
		this.initialLoad = true;
		this.hasMore = true;
		this.state = {
			addMessage: null,
			displayGif: false,
			page: 0,
			pageLimit: 10
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

	/**
    @name loadItems

    @description A React component to render while more items are loading. The parent component must have a unique key prop.

    @example
      this.loadItems();
  */
	loadItems = () => {
		this.initialLoad = false;

		this.socket.emit('lazyLoad', {
			page: this.state.page,
			pageLimit: this.state.pageLimit,
			room: this.props.room
		});

		this.socket.once('refresh', (res) => {
			if (res.message.length !== 0) {
				this.hasMore = true;
				this.setState({
					messages: res.message
						.map((value, index) => {
							if (value.messageType === 'gif') {
								return (
									<div key={value._id}>
										<ChatGIFMessage
											message={value.message}
											posted={value.posted}
											user={value.username}
											style={
												this.props.cookies.get('user') === value.username ? (
													this.classes.messageStyleSpanPersonal
												) : (
													this.classes.messageStyleSpan
												)
											}
										/>
									</div>
								);
							} else {
								return (
									<div key={value._id}>
										<ChatMessage
											message={value.message}
											posted={value.posted}
											user={value.username}
											style={
												this.props.cookies.get('user') === value.username ? (
													this.classes.messageStyleSpanPersonal
												) : (
													this.classes.messageStyleSpan
												)
											}
										/>
									</div>
								);
							}
						})
						.concat(this.state.messages)
				});

				this.setState({
					page: this.state.page + 1
				});
			}
		});
	};

	addMessage = (message, type) => {
		const { cookies } = this.props;

		// Adds the message into the database
		this.socket.emit('postMessage', {
			message: message,
			username: cookies.get('user'),
			messageType: type,
			page: this.state.page,
			pageLimit: this.state.pageLimit,
			room: this.props.room
		});

		// Clears the value of the posted message
		this.setState({ addMessage: '' });
	};

	// Life cycle components
	componentDidMount() {
		const { cookies } = this.props;

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

		// this.socket.on('userConnected', (res) => {
		// 	// Adds the message into the database
		// 	this.socket.emit('postMessage', {
		// 		message: `${cookies.get('user')} has joined ${this.props.room}`,
		// 		username: cookies.get('user'),
		// 		page: this.state.page,
		// 		pageLimit: this.state.pageLimit,
		// 		room: this.props.room
		// 	});
		// });

		this.socket.on('loadMessage', (res) => {
			this.setState({
				messages: res.message
					.map((value, index) => {
						if (value.messageType === 'gif') {
							return (
								<div key={value._id + index}>
									<ChatGIFMessage
										message={value.message}
										posted={value.posted}
										user={value.username}
										style={
											this.props.cookies.get('user') === value.username ? (
												this.classes.messageStyleSpanPersonal
											) : (
												this.classes.messageStyleSpan
											)
										}
									/>
								</div>
							);
						} else {
							return (
								<div key={value._id + index}>
									<ChatMessage
										message={value.message}
										posted={value.posted}
										user={value.username}
										style={
											this.props.cookies.get('user') === value.username ? (
												this.classes.messageStyleSpanPersonal
											) : (
												this.classes.messageStyleSpan
											)
										}
									/>
								</div>
							);
						}
					})
					.concat(this.state.messages)
			});
		});
	}

	componentDidUpdate() {
		this.hasMore = false;
		this.scrollToBottom();
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}

	render() {
		const loader = (
			<div className="loader" key={0} style={{ height: '100px' }}>
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<Paper elevation={10}>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Skeleton variant="circle" width={40} height={40} />
									</ListItemAvatar>
									<ListItemText
										primary={<Skeleton variant="rect" width={'100%'} height={50} />}
										secondary={<Skeleton variant="text" width={'25%'} />}
									/>
								</ListItem>
							</List>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);

		return (
			<div>
				<Grid container spacing={2} justify={'flex-end'}>
					<Grid item xs={8} sm={8} md={8} lg={8} xl={8} align="center">
						<Typography variant="h4" color={'error'}>
							ROOM {this.props.room.toUpperCase()}
						</Typography>
					</Grid>
					<Grid item xs={2} sm={2} md={2} lg={2} xl={2} align="right">
						<IconButton aria-label="settings" style={{ color: '#fff' }}>
							<MoreVertIcon />
						</IconButton>
					</Grid>
				</Grid>
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
							{_.sortBy(this.state.messages, (o) => {
								try {
									return o.props.children.props.posted;
								} catch (e) {}
							})}
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
							style={{ backgroundColor: this.chatColor }}
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
