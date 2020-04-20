import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'character',
	new Schema({
		type: String,
		label: String,
		userID: mongoose.Types.ObjectId
	})
);
