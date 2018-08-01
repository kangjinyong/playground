var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8080;
var router = express.Router();
var mongoose = require('mongoose');

var config = require('./server.config');
var verifyAuth = require('./middleware/verifyAuth');
var todosRouter = require('./routers/todos.router');

var option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

mongoose.connect('mongodb://' + 
        config.development.database.username + ':' + 
        config.development.database.pwd + '@' + 
        config.development.database.url + ':' + 
        config.development.database.port + '/' + 
        config.development.database.db, option).then(function() {
    console.log('mongodb connected');    
}, function(err) {
    console.log('Error connecting to mongodb');
    console.log(err);
});

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

// Routes start from here.

router.get('/', function(req, res) {
    res.json(
        { 'apiKey': config.development.google.apiKey, 'clientId': config.development.google.clientId }
    );
});

router.use('/todos', verifyAuth(), todosRouter);

// Routes end here.

app.use(function(err, req, res, next) {
    if (err) {
        res.status(500).send(err);
        console.log('Error message: ' + err);
    }
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});