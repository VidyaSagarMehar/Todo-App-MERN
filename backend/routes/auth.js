const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Create a User using: POST "/api/auth/createuser". No login required
router.post(
	'/createuser',
	[
		body('name', 'Enter a valid name').isLength({ min: 3 }),
		body('email', 'Enter a valid email').isEmail(),
		body('password', 'Password must be atleat 5 character').isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		// If there are errors, return bad request anf the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// check wheather the email already exists
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({
					error: 'sorry email already exists',
				});
			}
			// Password encryption
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);
			// To create a user
			user = await User.create({
				name: req.body.name,
				password: secPass,
				email: req.body.email,
			});
			res.json({
				user,
				Success: 'User Created successfully',
			});
		} catch (error) {
			// Handle Errors
			console.error(error.message);
			res.status(500).send('Some error occured');
		}
	},
);

module.exports = router;
