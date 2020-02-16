import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

// https://www.bryndonovan.com/2015/06/16/master-list-of-physical-descriptions/

module.exports = mongoose.model(
	'archetypes',
	new Schema({
		eyes: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		skinColor: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		skin: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		hairColor: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		hairLength: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		height: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		eyebrows: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		face: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		nose: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		facialHair: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		mouth: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		bodyType: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		},
		hands: {
			label: String,
			image: {
				data: Buffer,
				contentType: String
			}
		}
	})
);
