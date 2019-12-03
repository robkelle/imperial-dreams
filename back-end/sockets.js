import Message from './models/message.model';

class InitSockets {
	constructor(io) {
		this.io = io;
	}

	start() {
		this.io.on('connection', (socket) => {
			socket.on('addMessage', (res) => {
				let message = new Message({
					message: res.message
				});

				message.save().then((res) => {
					if (res) {
						// Resolve callback issue so that I do not have to run message in front of emit
						Message.find({}, (err, messages) => {
							this.io.emit('refresh', { message: messages });
						});
					}
				});
			});
		});
	}

	async handleCallBackHell() {
		return await Message.find({}, (err, result) => {
			// Run funciton in here to handle async code
			return result;
		});
	}
}

module.exports = InitSockets;
