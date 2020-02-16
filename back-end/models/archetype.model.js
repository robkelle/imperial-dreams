import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

// https://www.bryndonovan.com/2015/06/16/master-list-of-physical-descriptions/

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
