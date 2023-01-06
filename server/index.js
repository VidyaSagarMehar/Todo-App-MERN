require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT;

// to use req.body -> we need to add midddleware of express
app.use(express.json());
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

app.listen(port, () => {
	console.log(`Todo app backend listening on port http://localhost:${port}`);
});
