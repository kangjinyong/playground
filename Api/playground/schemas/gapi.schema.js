var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    apiKey: String,
    clientId: String
}, { collection: 'gapi'});

module.exports = mongoose.model('gapi', todoSchema);