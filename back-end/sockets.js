import Message from './models/message.model';

class InitSockets {
	constructor(io) {
		this.io = io;
	}

	start() {
		this.io.on('connection', (socket) => {
			socket.on('addMessage', (res) => {
				let message = new Message({
					message: res.message,
					username: res.username,
					messageType: res.messageType
				});

				message.save().then((res) => {
					if (res) {
						// Resolve callback issue so that I do not have to run message in front of emit
						Message.find({}, (err, res) => {
							this.io.emit('refresh', { message: res });
						});
					}
				});
			});

			socket.on('load', (res) => {
				if (res === 'load') {
					Message.find({}, (err, res) => {
						this.io.emit('refresh', { message: res });
					});
				}
			});
		});
	}
}

module.exports = InitSockets;
