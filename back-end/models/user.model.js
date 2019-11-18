import mongoose from 'mongoose';
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'users',
	new Schema({
		username: String,
		fname: String,
		lname: String,
		email: String,
		created: Date,
		token: String,
		password: String,
		admin: Boolean
	})
);
