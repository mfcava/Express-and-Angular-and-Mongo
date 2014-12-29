/* var express = require('express');
   var router = express.Router();

GET home page. 
   router.get('/', function(req, res) {
   res.render('index', { title: 'Express' });
   });

   module.exports = router;
*/


/**
 * The Index of Routes
 */

module.exports = function (app) {
    app.use('/signup', require('./routes/signup'));
	app.use('/users',  require('./routes/users'));
	
}