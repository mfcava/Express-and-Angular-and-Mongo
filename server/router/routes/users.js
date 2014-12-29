var express = require('express');
var router = express.Router();


var db = require('../../database');
var Users = db.users;

/* GET users listing. */
router.get('/', function(req, res) {
	
	Users.find( function(err, users) {
		if (err) return console.error(err);
		console.dir(users);
		res.send(users);
	});
	
});

module.exports = router;
