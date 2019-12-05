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
					messageType: res.messageType,
					posted: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
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
				if (res.load === true) {
					Message.find().skip(res.page * res.pageLimit).limit(res.pageLimit).exec((err, res) => {
						this.io.emit('refresh', { message: res });
					});
				}
			});
		});
	}
}

module.exports = InitSockets;
