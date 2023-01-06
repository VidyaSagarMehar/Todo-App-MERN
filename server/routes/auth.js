require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// middleware
const fetchuser = require('../middleware/fetchuser');

//Route 1-  Create a User using: POST "/api/auth/createuser". No login required
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
		let success = false;
		// If there are errors, return bad request anf the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}
		// check wheather the email already exists
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({ success, error: 'sorry email already exists' });
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

			const data = {
				user: {
					id: user.id,
				},
			};

			const authToken = jwt.sign(data, process.env.JWT_SECRET);
			// console.log(jwtData);
			const success = true;
			res.json({ success, authToken });

			// res.json({
			// 	user,
			// 	Success: 'User Created successfully',
			// });
		} catch (error) {
			// Handle Errors
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	},
);

//Route 2 -  Authenticate aUser using: POST "/api/auth/login". No login required
router.post(
	'/login',
	[
		body('email', 'Enter a valid email').isLength({ min: 3 }),
		body('password', 'Password can not be blank').exists(),
	],
	async (req, res) => {
		let success = false;
		// If there are errors, return bad request anf the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// get password and compare it
		const { email, password } = req.body;
		try {
			// find existing user email
			let user = await User.findOne({ email });
			if (!user) {
				success = false;

				return res.status(400).json({
					success,
					error: 'Please try to login with valid credentials',
				});
			}
			// compare password nad handle it if it dosen't match
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				success = false;
				return res.status(400).json({
					success,
					error: 'Please try to login with valid credentials',
				});
			}

			// send payload
			const data = {
				user: {
					id: user.id,
				},
			};

			const authToken = jwt.sign(data, process.env.JWT_SECRET);
			success = true;
			res.json({ success, authToken });
		} catch (error) {
			// Handle Errors
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	},
);

//Route 3-  Get login  User details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
	try {
		userId = req.user.id;
		const user = await User.findById(userId).select('-password');
		res.send(user);
	} catch (error) {
		// Handle Errors
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});

module.exports = router;
