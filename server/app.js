var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

/* *
   * Route Imports
   * var signup = require('./routes/signup'); 
*/

var app = express();



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
   // RIMOSSE MA SENZA SAPERE IL PERCHE'...
   // app.use(function(req, res, next) {
   //    var err = new Error('Not Found');
   //    err.status = 404;
   //    next(err);
   //});

// error handlers

// development error handler
// will print stacktrace
/**
 * Development Settings
 */
   
if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    var router = require('./router')(app);

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    var router = require('./router')(app);

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

   /*
   	* MQTT Server start
   	* 
	*/
	var mosca = require('mosca')
	var ascoltatore = {
  		//using ascoltatore
  	  	type: 'mongo',        
		url: 'mongodb://localhost:27017/mqtt',
  	  	pubsubCollection: 'ascoltatori',
  	  	mongo: {}
	};

	var moscaSettings = {
  	  port: 1883,
  	  backend: ascoltatore,
  	  persistence: {
    	  factory: mosca.persistence.Mongo,
    	  url: 'mongodb://localhost:27017/mqtt'
  	  }
	};

	var server = new mosca.Server(moscaSettings);
	
	server.on('ready', setup);
	server.on('clientConnected', function(client) {
    	console.log('client connected', client.id);     
	});

	// fired when a message is received
	server.on('published', function(packet, client) {
  	  	console.log('Published', packet.payload);
	});

	// fired when the mqtt server is ready
	function setup() {
  	  console.log('Mosca server is up and running')
	}
	
	module.exports = app;
