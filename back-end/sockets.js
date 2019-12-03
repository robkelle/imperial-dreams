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

	handleCallBackHell() {
		const promise = Message.find({}).exec();

		return promise.then((res) => {
			console.log(res);
		});
	}
}

module.exports = InitSockets;
