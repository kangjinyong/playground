var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();

var options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('/cert.pem')
};

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
        config.database.username + ':' + 
        config.database.pwd + '@' + 
        config.database.url + ':' + 
        config.database.port + '/' + 
        config.database.db, option).then(function() {
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
        { 'apiKey': config.google.apiKey, 'clientId': config.google.clientId }
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

https.createServer(options, app).listen(443);