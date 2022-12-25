const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Routes 1 - Get all the notes usnig : GET "/api/notes/getuser" .Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});

// Routes 2 - Add a note usnig : POST "/api/notes/addnote" .Login required
router.post(
	'/addnote',
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
			const note = new Note({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const saveNote = await note.save();

			res.json(saveNote);
		} catch (error) {
			// Handle Errors
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	},
);

// Routes 3 - Update an existing Note usnig : PUT "/api/notes/updatenote" .Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;

	try {
		//Create a newNote object
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}

		// Find the note to be updated and update it
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send('Not found');
		}
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send('Not allowed');
		}

		note = await Note.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true },
		);
		res.json({ note });
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});

// Routes 4 - Delete an existing Note usnig : DELETE "/api/notes/deletenote" .Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
	try {
		// Find the note to be deleted and delete it
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send('Not found');
		}
		// Allow deletio if the user owns it
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send('Not allowed');
		}

		note = await Note.findByIdAndDelete(req.params.id);
		res.json({ Success: true, note: note });
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});
module.exports = router;
