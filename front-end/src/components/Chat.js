import {
	Dialog,
	DialogTitle,
	Fab,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Paper,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';

import ArrowIcon from '@material-ui/icons/ArrowForwardIos';
import ChatGIFMessage from './ChatGIFMessage';
import ChatLoader from './ChatLoader';
import ChatMessage from './ChatMessage';
import CloseIcon from '@material-ui/icons/Close';
import GifIcon from '@material-ui/icons/Gif';
import InfiniteScroll from 'react-infinite-scroller';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Picker from 'react-giphy-component';
import _ from 'lodash';
import config from '../config.json';
import io from 'socket.io-client';
import { withCookies } from 'react-cookie';

class Chat extends Component {
	constructor() {
		super();
		this.socket = io('http://localhost:4000');
		this._isMounted = false;
		this.chatColor = '#8a0303';
		this.classes = {
			messageStyleSpanPersonal: {
				backgroundColor: this.chatColor /*'#6B6BE9' OR #8a0303,*/,
				color: '#fff'
			},
			messageStyleSpan: {
				backgroundColor: '#D8DAE0',
				color: '#000'
			},
			sentMessageStyle: 'flex-end',
			receivedMessageStyle: 'flex-start',
			closeButton: {
				position: 'absolute',
				right: 0,
				top: 0,
				width: 50
			}
		};
		this.initialLoad = true;
		this.hasMore = true;
		this.state = {
			addMessage: null,
			displayGif: false,
			gifyOpen: true,
			page: 0,
			pageLimit: 10,
			helperText: false
		};
	}

	// Event handling
	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.addMessage(this.state.addMessage, 'text');
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

	handleClose = () => {
		this.setState({
			gifyOpen: false
		});
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
						.map((value) => {
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
											action={
												this.props.cookies.get('user') === value.username ? (
													this.classes.sentMessageStyle
												) : (
													this.classes.receivedMessageStyle
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
											action={
												this.props.cookies.get('user') === value.username ? (
													this.classes.sentMessageStyle
												) : (
													this.classes.receivedMessageStyle
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

		if (this.state.addMessage === '' || this.state.addMessage === null) {
			this.setState({
				helperText: true
			});
		} else {
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
			this.setState({ addMessage: '', helperText: false });
		}

		// This needs to be refactored to remove duplicate method call
		if (type === 'gif') {
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
			this.setState({ addMessage: '', helperText: false });
		}
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
										action={
											this.props.cookies.get('user') === value.username ? (
												this.classes.sentMessageStyle
											) : (
												this.classes.receivedMessageStyle
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
										action={
											this.props.cookies.get('user') === value.username ? (
												this.classes.sentMessageStyle
											) : (
												this.classes.receivedMessageStyle
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
		const loader = <ChatLoader />;

		return (
			<div>
				<Grid container spacing={2} justify={'flex-end'}>
					<Grid item xs={8} sm={8} md={8} lg={8} xl={8} align="center">
						<Typography variant="h4" style={{ color: 'rgb(217, 217, 217)' }}>
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
					<div className="overflow-auto side-bar" style={{ height: 500, overflow: 'auto', paddingTop: 20 }}>
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

				<div style={{ margin: '10px 0px 10px 0px' }} width={'100%'}>
					<Paper style={{ padding: 20 }}>
						<FormControl fullWidth={true} hiddenLabel={true}>
							<InputLabel htmlFor="message-input">Type a message</InputLabel>
							<Input
								id="message-input"
								fullWidth={true}
								autoFocus={true}
								disableUnderline={false}
								value={this.state.addMessage || ''}
								multiline={false}
								onChange={(e) => {
									this.setState({ addMessage: e.target.value });
								}}
								onKeyDown={this.handleKeyDown}
								endAdornment={
									<InputAdornment position="end" style={{ marginBottom: 12 }}>
										<Fab size={'small'} style={{ backgroundColor: this.chatColor, color: '#fff' }}>
											<ArrowIcon onClick={() => this.addMessage(this.state.addMessage, 'text')} />
										</Fab>
										<Fab
											size={'small'}
											style={{ backgroundColor: this.chatColor, color: '#fff', marginLeft: 5 }}
										>
											<GifIcon
												onClick={() => this.setState({ displayGif: true, gifyOpen: true })}
											/>
										</Fab>
									</InputAdornment>
								}
							/>
							{this.state.helperText ? (
								<FormHelperText error={true} style={{ color: this.chatColor }}>
									<strong>Please type a message to continue.</strong>
								</FormHelperText>
							) : (
								''
							)}
						</FormControl>
					</Paper>
				</div>
				<div align="right">
					{this.state.displayGif ? (
						<Dialog
							fullScreen={false}
							open={this.state.gifyOpen}
							onBackdropClick={() => this.setState({ gifyOpen: false })}
						>
							<DialogTitle align="right">
								<IconButton
									aria-label="Close"
									onClick={this.handleClose}
									style={{ backgroundColor: this.chatColor, color: '#fff' }}
								>
									<CloseIcon />
								</IconButton>
							</DialogTitle>
							<Picker onSelected={this.gifyLoader} />
						</Dialog>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}

export default withCookies(Chat);
