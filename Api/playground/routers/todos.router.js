var todosRouter = require('express').Router()
var todosSchema = require('../schemas/todo.schema');

todosRouter.route('/')
	.get(function(req, res) {
		todosSchema.find({ userId: req.body.userId }, function(err, todos) {
			if (err)
				res.send(err);
			res.json(todos);
		})
	})
	.post(function(req, res) {
		var todo = new todosSchema();
		todo.id = req.body.id;
		todo.userId = req.body.userId;
		todo.description = req.body.description;
		todo.done = false;
		todo.save(function(err) {
			if (err)
				res.send(err);
			res.json(todo);
		});
	});

module.exports = todosRouter;