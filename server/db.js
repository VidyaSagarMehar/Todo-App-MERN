// require('dotenv').config();
// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGO_URI;

// const connectToMongo = () => {
// 	mongoose.connect(mongoURI, () => {
// 		console.log('DB connected successfully');
// 	});
// };

// module.exports = connectToMongo;

require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
	mongoose
		.connect(mongoURI)
		.then((conn) => {
			console.log(`Connected to DB : ${conn.connection.host}`);
		})
		.catch((error) => {
			console.log(error.message);
			process.exit(1);
		});
};

module.exports = connectToMongo;
