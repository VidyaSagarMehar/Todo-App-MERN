const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	tag: {
		type: String,
		default: 'Generals',
	},
	date: {
		type: Date,
		default: Date.now, // we don't have to call Date.now() like this here, coz it will run when it s required
	},
});

module.exports = mongoose.model('notes', NotesSchema);
