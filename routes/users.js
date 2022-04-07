var express = require('express');
var router = express.Router();

const model = require('../models/index');

/* GET users listing. */
router.get('/', async function(req, res, next) {
	try {
		const users = await model.User.findAll({});
		if (users.length !== 0) {
			res.json({
				status: 'OK',
				messages: '',
				data: users
			});
		} else {
			res.json({
				status: 'ERROR',
				messages: 'EMPTY',
				data: {}
			});
		}
	} catch (err) {
		res.json({
			status: 'ERROR',
			messages: err.message,
			data: {}
		});
	}
});

// Get user by id
router.get('/:id', async function(req, res, next) {
	try {
		const user = await model.User.findOne({
			where: {
				id: req.params.id
			}
		});
		if (user) {
			res.json({
				status: 'OK',
				messages: '',
				data: user
			});
		} else {
			res.json({
				status: 'ERROR',
				messages: 'NOT FOUND',
				data: {}
			});
		}
	} catch (err) {
		res.json({
			status: 'ERROR',
			messages: err.message,
			data: {}
		});
	}
});

// POST users
router.post('/', async function(req, res, next) {
	try {
		const { firstName, lastName, email } = req.body;
		const users = await model.User.create({
			firstName,
			lastName,
			email
		});
		if (users) {
			res.status(201).json({
				status: 'OK',
				messages: 'User berhasil ditambahkan',
				data: users
			});
		}
	} catch (error) {
		res.status(400).json({
			status: 'ERROR',
			messages: error.message,
			data: {}
		});
	}
});
// UPDATE users
router.patch('/:id', async function(req, res, next) {
	try {
		const { firstName, lastName, email } = req.body;
		const user = await model.User.update(
			{
				firstName,
				lastName,
				email
			},
			{
				where: {
					id: req.params.id
				}
			}
		);
		if (user) {
			res.json({
				status: 'OK',
				messages: 'User berhasil diupdate',
				data: user
			});
		}
	} catch (error) {
		res.status(400).json({
			status: 'ERROR',
			messages: error.message,
			data: {}
		});
	}
});
// DELETE users
router.delete('/:id', async function(req, res, next) {
	try {
		const usersId = req.params.id;
		const users = await model.User.destroy({
			where: {
				id: usersId
			}
		});
		if (users) {
			res.json({
				status: 'OK',
				messages: 'User berhasil dihapus',
				data: users
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'ERROR',
			messages: err.message,
			data: {}
		});
	}
});

module.exports = router;
