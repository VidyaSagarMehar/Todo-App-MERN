const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Todo = require('../models/Todo');
const { body, validationResult } = require('express-validator');

// Home
router.get('/', async (req, res) => {
	res.send('Hello from todo app');
});

// Routes 1 - Get all the todos usnig : GET "/api/todos/getuser" .Login required
router.get('/fetchalltodos', fetchuser, async (req, res) => {
	try {
		const todos = await Todo.find({ user: req.user.id });
		res.json(todos);
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});

// Routes 2 - Add a todo usnig : POST "/api/todos/addtodo" .Login required
router.post(
	'/addtodo',
	fetchuser,
	[
		body('title', 'Enter a valid title').isLength({ min: 3 }),
		body('description', 'Description must be atleat 5 character').isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			// If there are errors, return bad request anf the errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const todo = new Todo({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const saveTodo = await todo.save();

			res.json(saveTodo);
		} catch (error) {
			// Handle Errors
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	},
);

// Routes 3 - Update an existing Todo usnig : PUT "/api/todos/updatetodo" .Login required
router.put('/updatetodo/:id', fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;

	try {
		//Create a newTodo object
		const newTodo = {};
		if (title) {
			newTodo.title = title;
		}
		if (description) {
			newTodo.description = description;
		}
		if (tag) {
			newTodo.tag = tag;
		}

		// Find the todo to be updated and update it
		let todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).send('Not found');
		}
		if (todo.user.toString() !== req.user.id) {
			return res.status(401).send('Not allowed');
		}

		todo = await Todo.findByIdAndUpdate(
			req.params.id,
			{ $set: newTodo },
			{ new: true },
		);
		res.json({ todo });
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});

// Routes 4 - Delete an existing Todo usnig : DELETE "/api/todos/deletetodo" .Login required
router.delete('/deletetodo/:id', fetchuser, async (req, res) => {
	try {
		// Find the todo to be deleted and delete it
		let todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).send('Not found');
		}
		// Allow deletio if the user owns it
		if (todo.user.toString() !== req.user.id) {
			return res.status(401).send('Not allowed');
		}

		todo = await Todo.findByIdAndDelete(req.params.id);
		res.json({ Success: true, todo: todo });
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});
module.exports = router;
