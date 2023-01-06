const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/todoMERN';

const connectToMongo = () => {
	mongoose.connect(mongoURI, () => {
		console.log('DB connected successfully');
	});
};

module.exports = connectToMongo;
