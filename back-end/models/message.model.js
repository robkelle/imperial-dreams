import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'messages',
	new Schema({
		message: String,
		posted: Date,
		userID: String,
		username: String,
		type: String,
		messageType: String
	})
);
