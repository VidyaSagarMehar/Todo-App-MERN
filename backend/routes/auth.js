const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post(
	'/',
	[
		body('name', 'Enter a valid name').isLength({ min: 3 }),
		body('email', 'Enter a valid email').isEmail(),
		body('password', 'Password must be atleat 5 character').isLength({
			min: 5,
		}),
	],
	(req, res) => {
		// console.log(req.body);
		// const user = User(req.body);
		// user.save();
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		User.create({
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
		})
			.then((user) => res.json(user))
			.catch((error) => {
				console.log(error);
				res.json({
					error: 'Please enter a unique value',
					message: error.message,
				});
			});
	},
);

module.exports = router;
