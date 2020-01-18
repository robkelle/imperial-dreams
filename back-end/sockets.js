import Message from './models/message.model';

class InitSockets {
	constructor(io) {
		this.io = io;
	}

	/**
    @name _getMessages
    @private
    @description Emits an array of messages from the messages collection

    @example
      this._getMessages();
  */
	_getMessages(page, pageLimit) {
		Message.find().skip(page * pageLimit).limit(pageLimit).sort({ posted: -1 }).exec((err, res) => {
			this.io.emit('refresh', { message: res });
		});
	}

	/**
    @name _postMessage
    @private
    @description Posts a record to the messages collection

    @param {Object} [res] - The response from the client side addMessage socket emission

    @example
      this._postMessage(res);
  */
	_postMessage(res) {
		let message = new Message({
			message: res.message,
			username: res.username,
			messageType: res.messageType,
			posted: new Date()
		});

		// When the message is saved to the database, emits the message to the client
		message.save().then(() => {
			Message.findById(message._id).exec((err, res) => {
				this.io.emit('loadMessage', { message: [ res ] });
			});
		});
	}

	/**
    @name _socketLoader
    @private
    @description The load socket will handle all the message posts and refresh the page when the client component mounts

    @param {Object} [socket] - description

    @example
      code example

    @returns {type} description
  */
	_socketLoader(socket) {
		socket.on('lazyLoad', (res) => {
			this._getMessages(res.page, res.pageLimit);
		});
	}

	/**
    @name _socketPoster
    @private
    @description  Posts a message to the message collection

    @param {Object} [socket] - description

    @example
      code example

    @returns {type} description
  */
	_socketPoster(socket) {
		socket.on('postMessage', (res) => {
			this._postMessage(res);
		});
	}

	/**
    @name start
    @description description

    @example
      code example

    @returns {type} description
  */
	start() {
		this.io.on('connection', (socket) => {
			this._socketLoader(socket);
			this._socketPoster(socket);
		});
	}
}

module.exports = InitSockets;
