(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			//var clientWidth = docEl.clientWidth;
			var clientWidth = $(window).width();
			if (!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
			//alert(clientWidth)
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	recalc();
})(document, window);

var fixdtype = "http://api.mypuduo.com/";
var aperiod;

$(function(){
				$(".return").click(function(){
				window.location.href="javascript:history.go(-1)";
			})
			})


$(function(){
			var $li = $(".fixd_icon_ul li")
			if($li.length == 4){
				$(".fudong").addClass("four_pic");
			}else{
				$(".fudong").addClass("five_pic");
			}
			
		})


