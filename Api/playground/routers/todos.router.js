var todosRouter = require('express').Router()
var todosSchema = require('../schemas/todo.schema');

todosRouter.route('/')
	.get(function(req, res) {
		todosSchema.find({ userId: req.body.userId }, function(err, todos) {
			if (err)
				res.send(err);
			res.json(todos);
		});
	})
	.post(function(req, res) {
		var todo = new todosSchema();
		todo.order = req.body.order;
		todo.userId = req.body.userId;
		todo.description = req.body.description;
		todo.done = false;
		todo.save(function(err) {
			if (err)
				res.send(err);
			res.json(todo);
		});
	});

todosRouter.route('/:todo_id')
	.put(function(req, res) {
		todosSchema.findById(req.params.todo_id, function(err, todo) {
			if (err)
				res.send(err);
			if (req.body.description != null)
				todo.description = req.body.description;
			if (req.body.done != null)
				todo.done = req.body.done;
			todo.save(function(err) {
				if (err)
					res.send(err);
				res.json(todo);
			})
		});
	})
	.delete(function(req, res) {
		todosSchema.findByIdAndRemove(req.params.todo_id, function(err, todo) {
			if (err)
				res.send(err);
			res.json(todo);
		});
	});

module.exports = todosRouter;