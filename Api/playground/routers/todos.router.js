var todosRouter = require('express').Router()

todosRouter.get('/', function(req, res) {
	res.json({ message: 'Hello ToDos!' });
});

module.exports = todosRouter;