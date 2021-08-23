import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'inventory',
	new Schema({
		name: String,
		type: String,
		quantity: String,
		price: String,
		image: {
			data: Buffer,
			contentType: String
		}
	})
);
