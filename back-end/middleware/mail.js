import nodemailer from 'nodemailer';
import config from '../config.json';

function init_mail() {
	var transporter = nodemailer.createTransport({
		service: config.MAIL_SERVER.SERVICE,
		auth: {
			user: config.MAIL_SERVER.USER,
			pass: config.MAIL_SERVER.PASSWORD
		}
	});

	return transporter;
}

var transporter = init_mail();

// Export for use accross project
module.exports = transporter;
