var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    id: String,
    userId: String,
    description: String,
    done: Boolean
}, { collection: 'todos'});

module.exports = mongoose.model('Todo', todoSchema);