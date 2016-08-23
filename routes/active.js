var express = require('express');
var router = express.Router();

/* GET active page. */
router.get('/active/register', function(req, res, next) {
	res.render('activeone/register', {
		title: '注册就送大礼包'
	});
});

router.get('/active/invide', function(req, res, next) {
	res.render('activeone/invidefriend', {
		title: '邀请好友领红包'
	});
});

router.get('/active/flower', function(req, res, next) {
	res.render('activeone/send-flower', {
		title: '送我花花吧'
	});
});
module.exports = router;