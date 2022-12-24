const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now, // we don't have to call Date.now() like this here, coz it will run when it s required
	},
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
