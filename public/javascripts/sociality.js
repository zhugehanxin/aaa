// dropload
var API_KEY = 'D6F8DEB21DE384DBBC095BC9EFB1B4159EA47E09';
var meInit;
var pageNum = 1;
var selectB;
var dropload = function() {
	$(".loading_content").dropload({
		scrollArea: window,
		domUp: {
			domClass: 'dropload-up',
			domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
			domUpdate: '<div class="dropload-update">↑释放更新</div>',
			domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		},
		domDown: {
			domClass: 'dropload-down',
			domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
			domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
			domNoData: '<div class="dropload-noData">暂无数据</div>'
		},
		loadUpFn: function(me) {
			meInit = me;
			pageNum = 1;
			$(".sociality_out").html('');
			if(selectB == 1) {
				console.log(1)
				careData("up", 1);
			} else {
				worldData("up", 1);
			}
		},
		loadDownFn: function(me) {
			meInit = me;
			setTimeout(function() {
				if(selectB == 1) {
					careData("down", pageNum);
				} else {
					worldData("down", pageNum);
				}
			}, 300)
		},
		threshold: 50
	});
}

;(function() {　　
				var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';　　
				if(!$.fn.quickOn) {　　
					$.fn.quickOn = function() {　　
						arguments[0] = (arguments[0] === 'click') ? isTouch : arguments[0];　　
						return $.fn.on.apply(this, arguments);　　
					};　　
				}　　
			})();
;(function() {　　
				var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click',
					_on = $.fn.on;　　
				$.fn.on = function() {	　　
					arguments[0] = (arguments[0] === 'click') ? isTouch : arguments[0];	　　
					return _on.apply(this, arguments);	　　
				};	　　
			})();

//世界里的内容
var worldData = function(type, page) {
	var deviceIdentifier = "9ce46147d9135e8abe797c9127bf56e9";
	var time = 1468490684;
	var postType = 2;
	var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
	var requertUrl = 'http://api.hxfapp.com/v1/post/list';
	var data = getSign({
		"deviceIdentifier": deviceIdentifier,
		"page": page,
		"time": time,
		"postType": postType,
		"sid": sid
	});
	$.ajax({
		type: "get",
		url: requertUrl,
		data: data,
		dataType: "json",
		async: false, //同步请求，默认为异步		
		cache: false,
		success: function(data) {
			var list = data.data.list;
			var more = data.data.more;
			var item = '';
			if(more == 1 || type == "up") {
				pageNum++;
				meInit.noData(false);
			}
			for(var i = 0, l = list.length; i < l; i++) {
				var objItem = list[i];
				item += '<div class="sociality_content" feedId = "';
				item += objItem.feedId;
				item += '"><ul class="sociality_con_mix"><a href="http://localhost:3000/community/message?feedId=';
				item += objItem.feedId;
				item += '"><li class="sociality_con_mix_a"><div><img src="';
				item += objItem.postUserInfo.avatar;
				item += '" alt="" /></div><div><p>';
				item += objItem.postUserInfo.nickname;
				item += '</p></div><div class="sociality_mix_change_time">';
				var past = objItem.created;
				var past_b = objItem.created * 1000;
				var days = new Date();
				var endtime = Date.parse(days) / 1000;
				var aparttime = endtime - past;
				var addHtml = '';
				var pasttime = new Date(past_b);
				if(aparttime >= 7 * 24 * 60 * 60 && (pasttime.getFullYear()) != (new Date().getFullYear())) {
					addHtml = pasttime.getFullYear() + '年' + (pasttime.getMonth() + 1) + '月' + pasttime.getDate() + '日'
				} else if(aparttime >= 7 * 24 * 60 * 60) {
					addHtml = (pasttime.getMonth() + 1) + '月' + pasttime.getDate() + '日'
				} else if(aparttime > 24 * 60 * 60 && aparttime <= 7 * 24 * 60 * 60) {
					addHtml = Math.floor(aparttime / (24 * 60 * 60)) + '天前'
				} else if(aparttime > 60 * 60 && aparttime <= 24 * 60 * 60) {
					addHtml = Math.floor(aparttime / (60 * 60)) + '小时前'
				} else if(aparttime > 60 && aparttime <= 60 * 60) {
					addHtml = Math.floor(aparttime / 60) + '分钟前'
				} else {
					addHtml = '刚才'
				}
				item += addHtml;
				item += '</div></li><li class="sociality_con_mix_b"><img src="';
				for(var f = 0, e = objItem.postFiles.length; f < e; f++) {
					oitem = objItem.postFiles[f];
					item += oitem.fileUrl;
				}
				item += '" alt=""/>';
				if(objItem.postContent != '') {
					item += '</li><li class="sociality_con_mix_c"><p>';
					item += objItem.postContent;
					item += '</p></li>';
				}
				item += '</ul></a>';
				item += '<div class="sociality_con_mix_d"><div class="sociality_first sociality_sefi">';
				item += '<img src="';
				if(objItem.isLike == 2) {
					item += '../../public/images/community/ico_like@2x.png';
				} else {
					item += '../../public/images/community/ico_like_click@2x.png';
				}
				item += '" alt="" /><span class="like_numbers" itemid="';
				item += objItem.isLike;
				item += '">';
				item += objItem.likeNum;
				item += '</span>赞 </div><a href="http://localhost:3000/community/message?feedId=';
				item += objItem.feedId;
				item += '&action=comment"><div class="sociality_second sociality_sefi">';
				item += '<img src = "../../public/images/community/ico_comment_click@2x.png" alt = "" />';
				item += objItem.commentNum;
				item += '评论 </div></a>';
				item += '<div class="sociality_flower"><img src="../../public/images/community/ico_flower_click@2x.png" alt=""/>';
				item += '</div><div class="sociality_share"></div></div><div class="sociality_con_nothing"></div></div>';
			}
			$(".sociality_out").append(item);
			if($(".sociality_content").length >= data.data.total) {
				// 锁定
				meInit.lock();
				// 无数据
				meInit.noData();
			}
			// 每次数据加载完，必须重置
			meInit.resetload();
			//如果为上拉，需要解锁
			if(type == "up") {
				meInit.unlock();
			}
			var heightb = $('.hidden_index').height();
			$('.pop_shadow').css('height', heightb);
		},
		error: function(xhr) {
			//alert('Ajax error!');
			// 即使加载出错，也得重置
			alert("获取数据异常，请刷新后重试...")
			meInit.resetload();
		}
	});
}

//关注内容
var careData = function(type, page) {
	var deviceIdentifier = "9ce46147d9135e8abe797c9127bf56e9";
	var time = 1468490684;
	var postType = 1;
	var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
	var requertUrl = 'http://api.hxfapp.com/v1/post/list';
	var data = getSign({
		"deviceIdentifier": deviceIdentifier,
		"page": page,
		"time": time,
		"postType": postType,
		"sid": sid
	});
	$.ajax({
		type: "get",
		url: requertUrl,
		data: data,
		dataType: "json",
		async: false, //同步请求，默认为异步		
		cache: false,
		success: function(data) {
			var list = data.data.list;
			var more = data.data.more;
			var item = '';
			if(type == "up") {
				pageNum = 1;
				$(".sociality_out").html('');
			}
			if(more == 1 || type == "up") {
				pageNum++;
				meInit.noData(false);
			}
			for(var i = 0, l = list.length; i < l; i++) {
				var objItem = list[i];
				item += '<div class="sociality_content" feedId = "';
				item += objItem.feedId;
				item += '"><ul class="sociality_con_mix"><a href="http://localhost:3000/community/message?feedId=';
				item += objItem.feedId;
				item += '"><li class="sociality_con_mix_a"><div><img src="';
				item += objItem.postUserInfo.avatar;
				item += '" alt="" /></div><div><p>';
				item += objItem.postUserInfo.nickname;
				item += '</p></div><div class="sociality_mix_change_time">';
				var past = objItem.created;
				var past_b = objItem.created * 1000;
				var days = new Date();
				var endtime = Date.parse(days) / 1000;
				var aparttime = endtime - past;
				var addHtml = '';
				var pasttime = new Date(past_b);
				if(aparttime >= 7 * 24 * 60 * 60 && (pasttime.getFullYear()) != (new Date().getFullYear())) {
					addHtml = pasttime.getFullYear() + '年' + (pasttime.getMonth() + 1) + '月' + pasttime.getDate() + '日'
				} else if(aparttime >= 7 * 24 * 60 * 60) {
					addHtml = (pasttime.getMonth() + 1) + '月' + pasttime.getDate() + '日'
				} else if(aparttime > 24 * 60 * 60 && aparttime <= 7 * 24 * 60 * 60) {
					addHtml = Math.floor(aparttime / (24 * 60 * 60)) + '天前'
				} else if(aparttime > 60 * 60 && aparttime <= 24 * 60 * 60) {
					addHtml = Math.floor(aparttime / (60 * 60)) + '小时前'
				} else if(aparttime > 60 && aparttime <= 60 * 60) {
					addHtml = Math.floor(aparttime / 60) + '分钟前'
				} else {
					addHtml = '刚才'
				}
				item += addHtml;
				item += '</div></li><li class="sociality_con_mix_b"><img src="';
				for(var f = 0, e = objItem.postFiles.length; f < e; f++) {
					oitem = objItem.postFiles[f];
					item += oitem.fileUrl;
				}
				item += '" alt=""/>';
				if(objItem.postContent != '') {
					item += '</li><li class="sociality_con_mix_c"><p>';
					item += objItem.postContent;
					item += '</p></li>';
				}
				item += '</ul></a>';
				item += '<div class="sociality_con_mix_d"><div class="sociality_first sociality_sefi">';
				item += '<img src="';
				if(objItem.isLike == 2) {
					item += './../public/images/community/ico_like@2x.png';
				} else {
					item += './../public/images/community/ico_like_click@2x.png';
				}
				item += '" alt="" /><span class="like_numbers" itemid="';
				item += objItem.isLike;
				item += '">';
				item += objItem.likeNum;
				item += '</span>赞 </div><a href="http://localhost:3000/community/message?feedId=';
				item += objItem.feedId;
				item += '&action=comment"><div class="sociality_second sociality_sefi">';
				item += '<img src = "./../public/images/community/ico_comment_click@2x.png" alt = "" />';
				item += objItem.commentNum;
				item += '评论 </div></a>';
				item += '<div class="sociality_flower"><img src="./../public/images/community/ico_flower_click@2x.png" alt=""/>';
				item += '</div><div class="sociality_share"></div></div><div class="sociality_con_nothing"></div></div>';
			}
			$(".sociality_out").append(item);
			if($(".sociality_content").length >= data.data.total) {
				// 锁定
				meInit.lock();
				// 无数据
				meInit.noData();
			}
			// 每次数据加载完，必须重置
			meInit.resetload();
			//如果为上拉，需要解锁
			if(type == "up") {
				meInit.unlock();
			}
			var heightb = $('.hidden_index').height();
			$('.pop_shadow').css('height', heightb);
		},
		error: function(xhr) {
			//alert('Ajax error!');
			// 即使加载出错，也得重置
			alert("获取数据异常，请刷新后重试...")
			meInit.resetload();
		}
	});
}

var feedId;
$(function() {
	dropload();
	$(".dropload-down").css('background-color', '#FFFFFF'); //向下刷新，css的背景颜色动态改变

	//分享按钮点击出现分享页
	$('.sociality_out').delegate('.sociality_share', 'click', function() {
			$('.share_page').fadeIn();
	})
	$('.share_page').click(function(){//点击分享页面，分享页面消失
		$('.share_page').fadeOut();
	})
		//点击赞图片，赞加和减少赞的数量
	$('.sociality_out').delegate('.sociality_first', 'click', function() {
		var feedId = $(this).parents('.sociality_content').attr('feedId')
		var isLike = $(this).find('span').attr("itemid"); //自建一个属性，用attr()获取该点击的赞上的itemid值
		var likeNum = $(this).find(".like_numbers").text();
		var _this = this;
		if($(this).find('img').attr('src') == '../../public/images/community/ico_like_click@2x.png') {
			//删除赞
			var urlRequest = 'http://api.hxfapp.com/v1/like/delete/create';
			var deviceIdentifier = '9ce46147d9135e8abe797c9127bf56e9';
			var feedId = feedId;
			var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
			var time = 1468909345;
			$.ajax({
				type: "post",
				url: urlRequest,
				data: getSign({
					'deviceIdentifier': deviceIdentifier,
					'feedId': feedId,
					'sid': sid,
					'time': time
				}),
				dataType: "json",
				async: false, //同步请求，默认为异步
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {
					if(data.status == "success") {
						//修改成功，跳转回个人中心页面	
						likeNum--;
						$(_this).find(".like_numbers").text(likeNum);
					} else {
						alert(data.data.msg);
					}
				},
				error: function(data) {
					alert("获取数据异常，请刷新后重试...");
				}
			});
			$(this).find('img').attr('src', '../../public/images/community/ico_like@2x.png');
		} else {
			//添加点赞
			var urlRequest = 'http://api.hxfapp.com/v1/like/create';
			var deviceIdentifier = '9ce46147d9135e8abe797c9127bf56e9';
			var feedId = feedId;
			var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
			var time = 1468909345;
			$.ajax({
				type: "post",
				url: urlRequest,
				data: getSign({
					'deviceIdentifier': deviceIdentifier,
					'feedId': feedId,
					'sid': sid,
					'time': time,
				}),
				dataType: "json",
				async: false, //同步请求，默认为异步
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {
					if(data.status == "success") {
						//修改成功，跳转回个人中心页面
						likeNum++;
						$(_this).find(".like_numbers").text(likeNum);
					} else {
						alert(data.data.msg);
					}
				},
				error: function(data) {
					alert("获取数据异常，请刷新后重试...");
				}
			});
			$(this).find('img').attr('src', '../../public/images/community/ico_like_click@2x.png');
		}
	})

	//送花弹出框
	$('.sociality_out').delegate('.sociality_flower', 'click', function() {
		$('.pop_shadow').css('display', 'block');
		$('.pop_content').slideDown(300);
	})
	$('.pop_content').delegate('.pop_content_img', 'click', function() {
		$('.pop_content').slideUp(300);
		setTimeout(function() {
			$(".pop_shadow").fadeOut();
			start();
		}, 300)
	})
	$('.pop_shadow').on('click', function() {//点击黑色半透明弹出框效果
		$('.pop_content').slideUp(300);
		setTimeout(function() {
			$('.pop_shadow').fadeOut();
		}, 300)
	})

	//送花的动态改变
	var valInput = $('.pop_content_middle input');
	$('.pop_content_ones li').on('click', function() {
		$('.pop_content_ones li').removeClass('pop_content_redborder');
		$(this).addClass('pop_content_redborder');
		inputNum = $('.pop_content_redborder').text();
		valInput.val(inputNum);
		$('.pop_bottom_one,.pop_bottom_two').text(inputNum);
	});
	$('.pop_content_self').children('.pop_content_left').on('click', function() {
		var valval = valInput.val();
		valval--;
		valInput.val(valval);
		$('.pop_bottom_one,.pop_bottom_two').text(valval);
	});
	$('.pop_content_self').children('.pop_content_right').on('click', function() {
		var valval = valInput.val();
		valval++;
		valInput.val(valval);
		$('.pop_bottom_one,.pop_bottom_two').text(valval);
	})
	$('.pop_content_btn').on('click', function() {
		if(!valInput.val().match(/^\+?[1-9][0-9]*$/)) {
			alert('请输入正整数哦!')
		} else {
			window.location.href = 'chongzhi_success.html'
		}
	});

	//用户自己输入花的数量
//	$(".pop_content_middle input").focus(function() {
//		$('.pop_shadow').css('position', 'absolute');
//		$('.pop_content').css('position', 'absolute');
//		var heightb = $('.hidden_index').height();
//		$('.pop_shadow').css('height', heightb);
//	}).blur(function() {
//		$('.pop_shadow').css('position', 'fixed');
//		$('.pop_content').css('position', 'fixed');
//		var heightb = $('.hidden_index').height();
//		$('.pop_shadow').css('height', heightb);
//	})

	function stop(){//阻止页面滑动
		$('.hidden_index').css('overflow','hidden');
		$('body').bind('touchmove',function(e){
			e.preventDefault();
		},false);
	}
	function start(){//页面恢复滑动
		$('.hidden_index').css('overflow','visible');
		$('body').unbind('touchmove');
	}
})

//切换js
function select_so(obj, e) {
	pageNum = 1;
	selectB = e;
	meInit.unlock();
	$(".sociality_in").removeClass("sociality_bottom");
	$(obj).addClass("sociality_bottom");
	$(".sociality_out").html('');
	if(e == 1) {
		careData("down", pageNum);
	} else {
		worldData("down", pageNum);
	}
}

function getSign(Param) {
	var Timestamp = Date.parse(new Date());
	var ParamRes = new Object();
	Param.time = Timestamp;

	var tmpParm = '';
	for(var k in Param) {
		tmpParm = tmpParm + k + Param[k];
	}
	//			console.log(tmpParm + API_KEY);

	Param.sign = sha1(tmpParm + API_KEY).toUpperCase();
	//			console.log(Param);
	return Param;
}