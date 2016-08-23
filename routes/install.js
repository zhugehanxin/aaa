var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/install/about_putuo', function(req, res, next) {
	res.render('install/about_putuo', {
		title: '关于扑多'
	});
});

router.get('/install/normal', function(req, res, next) {
	res.render('install/normal', {
		title: '常见问题'
	});
});

router.get('/install/home', function(req, res, next) {
	res.render('install/install_home',{
		title: '设置'
	});
});

router.get('/install/puduo', function(req, res, next) {
	res.render('install/puduointroduction', {
		title: '一元夺券介绍'
	});
});

router.get('/install/putuo', function(req, res, next) {
	res.render('install/whatispuduo', {
		title: '一元夺券是什么？'
	});
});


module.exports = router;