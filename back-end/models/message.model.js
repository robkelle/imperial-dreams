import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'messages',
	new Schema({
		message: String,
		userID: String,
		user: String,
		type: String
	})
);
