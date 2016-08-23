var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//	res.render('index3', {
//		title: 'Express'
//	});
//});

router.get('/payment', function(req, res, next) {
	res.render('payment');
});

router.get('/aa/aa', function(req, res, next) {
	res.render('aa');
});

//router.get('/install/about_putuo', function(req, res, next) {
//	res.render('install/about_putuo');
//});

router.get('/', function(req, res) {
	res.render('yiyuanduoquan');
});


module.exports = router;