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
			if(selectB == 1) {
				detailsData("up", 1);
				$(".like_null,socia_messa_like").show();
				$(".socia_messa_comme").hide();
			} else {
				detailsData("up", 1);
			}
		},
		loadDownFn: function(me) {
			meInit = me;
			if(selectB == 1) {
				detailsData("down", pageNum);
			} else {
				detailsData("down", pageNum);
			}
		},
		threshold: 50
	});
}

var deviceIdentifier = "9ce46147d9135e8abe797c9127bf56e9";
var action = "comment";
var feedId = getParam('feedId');
//var feedId = 1;
var time = 1468908790;
var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
var requertUrl = 'http://api.hxfapp.com/v1/post/index';
//正文头部内容
$(function() {
	var data = getSign({
		"deviceIdentifier": deviceIdentifier,
		"time": time,
		"feedId": feedId,
		"sid": sid,
		"page": 1,
		"action": action
	});
	$.ajax({
		type: "get",
		url: requertUrl,
		data: data,
		dataType: "json",
		async: false, //同步请求，默认为异步		
		cache: false,
		xhrFields: {
			withCredentials: true
		},
		success: function(data) {
			var feedInfo = data.data.feedInfo;
			var postFiles = feedInfo.postFiles;
			var commentList = data.data.comment.commentList;
			var item = '';
			item += '<ul class="sociality_con_mix"><li class="sociality_con_mix_a"><div><img src="';
			item += feedInfo.postUserInfo.avatar;
			item += '" alt="" /></div><div><p>' + feedInfo.postUserInfo.nickname + '</p></div>';
			if(feedInfo.postUserInfo.relation == 1) {
				item += '<div class="sociality_mix_change_btn">+关注</div>';
			} else {
				var past = feedInfo.created;
				var past_b = feedInfo.created * 1000;
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
				item += '<div class="sociality_mix_change_time">' + addHtml + '</div>';
			}

			item += '</li><li class="sociality_con_mix_b">';
			for(var i = 0, l = postFiles.length; i < l; i++) {
				var oitem = postFiles[i];
				item += '<img src="';
				item += oitem.fileUrl;
				item += '" alt="" />'
			}
			if(feedInfo.postContent != '') {
				item += '</li><li class="sociality_con_mix_c"><p>';
				item += feedInfo.postContent;
				item += '</p></li>';
			}
			item += '</ul>';
			item += '<div class="sociality_con_mix_d"><div class="sociality_first sociality_sefi" onclick="select_it(this,1)">';
			item += '<img src="../../public/images/community/ico_like@2x.png" alt="" /><span class="like_numbers">';
			item += feedInfo.likeNum;
			item += '</span>赞 </div><div class="add_bottom sociality_second sociality_sefi" onclick="select_it(this,2)">';
			item += '<img src = "../../public/images/community/ico_comment_click@2x.png" alt = "" /><span class="comment_numbers">';
			item += feedInfo.commentNum;
			item += '</span>评论 </div></div>';
			$(".sociality_content").append(item);
		},
		error: function(xhr) {
			//alert('Ajax error!');
			// 即使加载出错，也得重置
			meInit.resetload();
		}
	});
})

//评论里的内容
var isLike = '';
var detailsData = function(type, page) {
	var data = getSign({
		"deviceIdentifier": deviceIdentifier,
		"time": time,
		"feedId": feedId,
		"sid": sid,
		"page": page,
		"action": action
	});
	$.ajax({
		type: "get",
		url: requertUrl,
		data: data,
		dataType: "json",
		async: false, //同步请求，默认为异步		
		cache: false,
		xhrFields: {
			withCredentials: true
		},

		success: function(data) {
			var feedInfo = data.data.feedInfo;
			var postFiles = feedInfo.postFiles;
			var commentList = data.data.comment.commentList;
			if(type == "up") {
				pageNum = 1;
				$(".like_comment").html('');
			}
			if(data.data.comment.more == 1 || type == "up") {
				pageNum++;
				meInit.noData(false);
			}
			var commentOnes = '';
			var likeOnes = '';
			var aitem = '';
			if(feedInfo.isLike == 2) {
				likeOnes += '<div class="like_null" style="display:none">快来点个赞吧~</div>';
			} else {
				likeOnes += '<div class="like_null" style="display:none">谢谢点赞~</div>';
			}
			isLike = feedInfo.isLike;
			commentOnes += '<div class="socia_messa_comme">';
			for(var e = 0, f = commentList.length; e < f; e++) {
				var ocommentOnes = commentList[e];
				commentOnes += '<ul class="socia_comment_details" dataid="';
				commentOnes += ocommentOnes.commentId;
				commentOnes += '"><li class="socia_comment_pic"><img src="';
				commentOnes += ocommentOnes.fromUserInfo.avatar;
				commentOnes += '" alt="" /></li><li class="socia_comment_right"><div class="socia_comment_head"><p>';
				commentOnes += ocommentOnes.fromUserInfo.nickname;
				commentOnes += '</p><p>';
				var past_Other = ocommentOnes.created;
				var past_b_Other = ocommentOnes.created * 1000;
				var days_Other = new Date();
				var endtime_Other = Date.parse(days_Other) / 1000;
				var aparttime_Other = endtime_Other - past_Other;
				var addHtml_Other = '';
				var pasttime_Other = new Date(past_b_Other);
				if(aparttime_Other >= 7 * 24 * 60 * 60 && (pasttime_Other.getFullYear()) != (new Date().getFullYear())) {
					addHtml_Other = pasttime_Other.getFullYear() + '年' + (pasttime_Other.getMonth() + 1) + '月' + pasttime_Other.getDate() + '日'
				} else if(aparttime_Other >= 7 * 24 * 60 * 60) {
					addHtml_Other = (pasttime_Other.getMonth() + 1) + '月' + pasttime_Other.getDate() + '日'
				} else if(aparttime_Other > 24 * 60 * 60 && aparttime_Other <= 7 * 24 * 60 * 60) {
					addHtml_Other = Math.floor(aparttime_Other / (24 * 60 * 60)) + '天前'
				} else if(aparttime_Other > 60 * 60 && aparttime_Other <= 24 * 60 * 60) {
					addHtml_Other = Math.floor(aparttime_Other / (60 * 60)) + '小时前'
				} else if(aparttime_Other > 60 && aparttime_Other <= 60 * 60) {
					addHtml_Other = Math.floor(aparttime_Other / 60) + '分钟前'
				} else {
					addHtml_Other = '刚才'
				}
				commentOnes += addHtml_Other + '</p></div><div class="socia_comment_words">';
				commentOnes += ocommentOnes.content;
				commentOnes += '</div></li></ul>'
			}
			commentOnes += '</div>';
			//			aitem += commentOnes ;
			//			aitem += likeOnes;
			$(".like_comment").append(aitem);
			$(".like_comment").append(likeOnes);
			$(".like_comment").append(commentOnes);
			if($(".socia_comment_details").length >= data.data.comment.total) {
				// 锁定
				meInit.lock();
				// 无数据
				meInit.noData();
			}
			//每次数据加载完，必须重置
			meInit.resetload();
			//如果为上拉，需要解锁
			if(type == "up") {
				meInit.unlock();
			}

			var heightb = $('.hidden_one').height();
			$('.comment_area').css('height', heightb);
			$('.pop_shadow').css('height', heightb);

		},
		error: function(xhr) {
			//alert('Ajax error!');
			// 即使加载出错，也得重置
			meInit.resetload();
		}
	});
}

//切换赞和评论
function select_it(obj, b) {
	pageNum = 1;
	selectB = b;
	$(".like_comment").html('');
	if(b == 1) {
		$(".dropload-down").css('display', 'none')
		detailsData("down", pageNum);
		$(".sociality_first").addClass("add_bottom");
		$(".sociality_second").removeClass("add_bottom");
		$(".like_null,socia_messa_like").show();
		$(".socia_messa_comme").hide();
		$(".sociality_first img").attr('src', '../../public/images/community/ico_like_click@2x.png');
		$(".sociality_second img").attr('src', '../../public/images/community/ico_comment@2x.png');
	} else {
		$(".dropload-down").css('display', 'block')
		meInit.unlock();
		detailsData("down", pageNum);
		$(".sociality_second").addClass("add_bottom");
		$(".sociality_first").removeClass("add_bottom");
		$(".like_null,socia_messa_like").hide();
		$(".socia_messa_comme").show();
		$(".sociality_first img").attr('src', '../../public/images/community/ico_like@2x.png');
		$(".sociality_second img").attr('src', '../../public/images/community/ico_comment_click@2x.png');
	}
}

//添加点赞
var addLike = function() {
	var urlRequest = 'http://api.hxfapp.com/v1/like/create';
	var deviceIdentifier = '9ce46147d9135e8abe797c9127bf56e9';
	//	var feedId = 1;
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
				var n = $(".like_numbers").text();
				n++;
				$(".like_numbers").text(n);
			} else {
				alert(data.data.msg);
			}
		},
		error: function(data) {
			alert("获取数据异常，请刷新后重试...");
		}
	});

}

//删除赞
var deleteLike = function() {
	var urlRequest = 'http://api.hxfapp.com/v1/like/delete/create';
	var deviceIdentifier = '9ce46147d9135e8abe797c9127bf56e9';
	//	var feedId = 1;
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
				var n = $(".like_numbers").text();
				n--;
				$(".like_numbers").text(n);
			} else {
				alert(data.data.msg);
			}
		},
		error: function(data) {
			alert("获取数据异常，请刷新后重试...");
		}
	});
}

//添加评论
var addComment = function() {
	var urlRequest = 'http://api.hxfapp.com/v1/comment/create';
	var deviceIdentifier = '9ce46147d9135e8abe797c9127bf56e9';
	//	var feedId = 1;
	var textContent = $('.comment_out').find('.textarea_comment').val();
	var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
	var time = 1468909256;
	var content = textContent;
	if(textContent == '') {
		alert("请输入内容哦！")
	} else {
		$.ajax({
			type: "post",
			url: urlRequest,
			data: getSign({
				'deviceIdentifier': deviceIdentifier,
				'feedId': feedId,
				'sid': sid,
				'time': time,
				'content': content
			}),
			dataType: "json",
			async: false, //同步请求，默认为异步
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.status == "success") {
					//修改成功，跳转回个人中心页面
					$(".sociality_second").addClass("add_bottom");
					$(".sociality_first").removeClass("add_bottom");
					detailsData("up", 1);
					$('.comment_area').hide();
					var m = $(".comment_numbers").text();
					m++;
					$(".comment_numbers").text(m);
				} else {
					alert(data.data.msg);
				}
			},
			error: function(data) {
				alert("获取数据异常，请刷新后重试...");
			}
		});
	}

}

$(function() {
	dropload();
	$(".dropload-down").css('background-color', '#FFFFFF');
	if(isLike == 2) {
		$('.socia_messa_liked img').attr('src') == '../../public/images/community/ico_like@2x.png';
		$('.like_comment').find('.like_null').text('快来点个赞吧~');
	} else {
		$('.socia_messa_liked img').attr('src', '../../public/images/community/ico_like_click@2x.png');
		$('.like_comment').find('.like_null').text('谢谢点赞~');
	}
	$('.socia_messa_liked').click(function() {
		if($('.socia_messa_liked img').attr('src') == '../../public/images/community/ico_like_click@2x.png') {
			$('.socia_messa_liked img').attr('src', '../../public/images/community/ico_like@2x.png');
			deleteLike();
			$('.like_comment').find('.like_null').text('快来点个赞吧~');
		} else {
			addLike();
			$('.socia_messa_liked img').attr('src', '../../public/images/community/ico_like_click@2x.png');
			$('.like_comment').find('.like_null').text('谢谢点赞~');
		}
	})

	//分享页面
	$('.socia_messa_more').on('click', function() {
		$('.share_page').fadeIn();
	})
	$('.share_page').click(function() { //点击分享页面，分享页面消失
		$('.share_page').fadeOut();
	})
	$('.pop_window').delegate('.pop_shadow', 'click', function() { //点击黑色半透明弹出框效果
		$('.pop_content').slideUp(300);
		$('.delete_comment').slideUp(300);
		setTimeout(function() {
			$('.pop_shadow').fadeOut();

		}, 300)
	})

	//送花弹出框
	$('.hidden_one').delegate('.socia_messa_flower', 'click', function() {
		$('.pop_shadow').css('display', 'block');
		$('.pop_content').slideDown(300);
	})
	$('.pop_content').delegate('.pop_content_img', 'click', function() {
			$('.pop_content').slideUp(300);
			setTimeout(function() {
				$(".pop_shadow").fadeOut();
			}, 300)
		})
		//	$(".pop_content_middle input").focus(function() {
		//		$('.pop_shadow').css('position', 'absolute');
		//		$('.pop_content').css('position', 'absolute');
		//		var heightb = $('.hidden_one').height();
		//		$('.pop_shadow').css('height', heightb);
		//	}).blur(function(){
		//		$('.pop_shadow').css('position', 'fixed');
		//		$('.pop_content').css('position', 'fixed');
		//		var heightb = $('.hidden_one').height();
		//		$('.pop_shadow').css('height', heightb);
		//	});

	//弹出评论框
	var commentId = getParam('action');
	if(commentId == 'comment') {
		$('.comment_area').fadeIn();
		$('.socia_messa_botto').hide();
		$('.comment_out').find("textarea").focus();

	}
	$('.socia_messa_comment').click(function() {
		$('.comment_area').fadeIn();
		$('.socia_messa_botto').hide();
		$('.comment_out').find("textarea").focus();
	})
	$('.comment_out').find('.comment_cancel').click(function() {
		$('.comment_area').fadeOut();
		$('.socia_messa_botto').show();
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

	//点击评论调用ajax(增加评论)
	$('.comment_out').delegate('.comment_sent', 'click', function() {
			addComment();
			$('.socia_messa_botto').show();
			$('.comment_out').find('.textarea_comment').val('');
		})
		//点击删除评论
	$('.like_comment').delegate('.socia_comment_details', 'click', function() {
		//显示删除弹出框
		var commentId = $(this).attr("dataid");
		$('.delete_comment').slideDown(300);
		$(".pop_shadow").show();
		//删除评论
		$('.pop_window').click(function(event) {
			var $target = $(event.target);
			if($target.is('.pop_cancel')) {
				$('.delete_comment').slideUp(300);
				setTimeout(function() {
					$(".pop_shadow").hide();
				}, 300);
			} else if($target.is('.delete_commentyes')) {
				$('.delete_comment').slideUp(300);
				setTimeout(function() {
					$(".pop_shadow").hide();
				}, 300);
				var urlRequest = 'http://api.hxfapp.com/v1/comment/delete';
				var deviceIdentifier = '9ce46147d9135e8abe797c9127bf56e9';
				//	var feedId = 1;
				var sid = 'SESSION:44D8B845931514C655732B2F3507AEE19CC6BF3A';
				var time = 1468909256;
				$.ajax({
					type: "post",
					url: urlRequest,
					data: getSign({
						'deviceIdentifier': deviceIdentifier,
						'feedId': feedId,
						'sid': sid,
						'time': time,
						'commentId': commentId
					}),
					dataType: "json",
					async: false, //同步请求，默认为异步
					xhrFields: {
						withCredentials: true
					},
					success: function(data) {
						if(data.status == "success") {
							//修改成功，跳转回个人中心页面
							//				console.log(2)
							var m = $(".comment_numbers").text();
							m--;
							$(".comment_numbers").text(m);
							$('.socia_messa_liked img').attr('src', '../../public/images/community/ico_like@2x.png');
						} else {
							alert(data.data.msg);
						}
					},
					error: function(data) {
						alert("获取数据异常，请刷新后重试...");
					}
				});
				detailsData("up", 1);
			}
		})
	})

})

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

function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return unescape(r[2]);
	return 0;
}