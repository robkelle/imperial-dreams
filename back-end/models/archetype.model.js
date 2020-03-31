import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'archetypes',
	new Schema({
		type: String,
		label: String,
		image: {
			data: Buffer,
			contentType: String
		}
	})
);
