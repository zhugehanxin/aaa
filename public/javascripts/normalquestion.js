$(function() {
	var install_min = $(".install_min");
	var install_open = $(".install_open");
	install_min.click(function() {
		$(this).css('border-bottom', 'none')
			.parents().siblings().children(".install_min")
			.css('border-bottom', '1px solid #DDDDDD');
		if($(this).siblings().is(":hidden")) {
			$(this).parents().children(".install_open").slideDown();
			$(this).siblings()
				.show()
				.parents().siblings().children(".install_open")
				.slideUp();
		} else {
			$(this).parents().children(".install_open").slideUp();
			$(this).css('border-bottom', '1px solid #DDDDDD');
		}
	})
})