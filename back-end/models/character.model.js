import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'character',
	new Schema({
		userID: mongoose.Types.ObjectId,
		profileImage: {
			data: Buffer,
			contentType: String
		}
	})
);
