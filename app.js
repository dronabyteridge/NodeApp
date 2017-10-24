var express = require('express');
var path = require('path');
var fs=require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/testdb';
var mongo_url='mongodb://dronasahoo:byteridge024426@user-shard-00-00-fiwva.mongodb.net:27017,user-shard-00-01-fiwva.mongodb.net:27017,user-shard-00-02-fiwva.mongodb.net:27017/test?ssl=true&replicaSet=User-shard-0&authSource=admin';
var db;
//connect to atlas mongo db
MongoClient.connect(mongo_url,function(err,database)
{
  if(!err)
  {
    db=database;
  console.log("Connected correctly to server.");
  db.collection('user', function (err, collection) {
    
    
    db.collection('user').count(function (err, count) {
        if (err) throw err;
        
        console.log('Total Rows: ' + count);
    });

});
  }
 

});
//connect to local db test db
/*MongoClient.connect(url, function(err, dbs) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db=dbs;
  db.collection('user', function (err, collection) {
    
    
    db.collection('user').count(function (err, count) {
        if (err) throw err;
        
        console.log('Total Rows: ' + count);
    });

});
});*/
var index = require('./routes/index');
var users = require('./routes/users');
var filehandler=require('./routes/filehandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
  req.db = db;
  req.path=path;
  req.fs=fs;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/fileoperations',filehandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
