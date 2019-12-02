import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model(
	'users',
	new Schema({
		username: String,
		email: String,
		created: Date,
		accessToken: {
			issuer: String,
			token: String,
			iat: Date,
			exp: Date
		},
		refreshToken: {
			issuer: String,
			token: String,
			iat: Date,
			exp: Date
		},
		resetToken: String,
		password: String
	})
);
