import Message from './models/message.model';

class InitSockets {
	constructor(port) {
		this.io = require('socket.io')(port);
		this.messageCollection = Message;
	}

	start() {
		this.io.on('connection', (socket) => {
			socket.emit('announcements', { message: 'This is a test message coming from the web socket.' });

			socket.on('addNews', (data) => {
				let message = new Message({
					message: data.message
				});

				message.save();
			});
		});
	}
}

module.exports = InitSockets;
