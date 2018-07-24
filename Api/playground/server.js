var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8080;
var router = express.Router();
var mongoose = require('mongoose');

var dbconfig = require('./db.config');
var gapiSchema = require('./schemas/gapi.schema');
var todosRouter = require('./routers/todos.router');

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

mongoose.connect('mongodb://' + 
        dbconfig.development.database.username + ':' + 
        dbconfig.development.database.pwd + '@' + 
        dbconfig.development.database.url + ':' + 
        dbconfig.development.database.port + '/' + 
        dbconfig.development.database.db, option).then(function() {
    console.log('mongodb connected');    
}, function(err) {
    console.log('Error connecting to mongodb');
    console.log(err);
});

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// Routes start from here.

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('API called by ' + req.headers.host);
    next();
});

router.get('/', function(req, res) {
	gapiSchema.findOne(function(err, gapiInfo) {
        if (err) {
            res.send(err);
        }
        res.json(gapiInfo)
    })
});

router.use('/todos', todosRouter);

// Routes end here.

app.use(function(err, req, res, next) {
    if (err) {
        res.status(500).send(err);
        console.log('Error is ' + err);
    }
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});