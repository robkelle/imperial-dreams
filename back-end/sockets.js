import Message from './models/message.model';

class InitSockets {
	constructor() {
		this.messageCollection = Message;
	}

	start() {
		Message.find({}, (err, messages) => {
			io.on('connection', (socket) => {
				socket.emit('announcements', {
					message: messages
				});
			});
		});

		io.on('connection', (socket) => {
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
