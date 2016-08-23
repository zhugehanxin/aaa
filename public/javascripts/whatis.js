$(function() {
	new Swipe(document.getElementById('banner_box'), {
		speed: 500,
		callback: function() {
			var lis = $(this.element).next("ol").children();
			lis.removeClass("on").eq(this.index).addClass("on");
			if($("li:last-child").hasClass("on")) {
				$('.what_choose').hide();
			} else {
				$('.what_choose').show();
			}
		}
	});
});