var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/community/index', function(req, res, next) {
	res.render('community/index_personal', {
		title: '我的社区中心'
	});
});

router.get('/community/payment', function(req, res, next) {
	res.render('community/payment', {
		title: '支付订单'
	});
});

router.get('/community/ranking', function(req, res, next) {
	res.render('community/ranking_list', {
		title: '排行榜'
	});
});

router.get('/community/sendget', function(req, res, next) {
	res.render('community/sendandget', {
		title: '收花送花'
	});
});

router.get('/community/sociality', function(req, res, next) {
	res.render('community/sociality', {
		title: '社交主页'
	});
});

router.get('/community/message', function(req, res, next) {
	res.render('community/sociality_message', {
		title: '正文'
	});
});

module.exports = router;