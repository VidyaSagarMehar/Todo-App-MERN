const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;

// to use req.body -> we need to add midddleware of express
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
