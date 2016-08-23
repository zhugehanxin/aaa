$(function() {
	//invidefriend page
	//弹出框居中显示
	var height = $(window).height();
	$('.pop-shadow').css('height', height);
	$(".pop-content img").load(function() {
		var heightB = $(window).height() / 2 - $('.pop-content').height() / 2;
		$('.pop-content').css('top', heightB);
	});
	//温馨提示的滑动效果
	$('.invide-hint h1').on('click', function() {
		if($('.invide-down').css('display') == 'none') {
			$('.invide-animate').slideUp(500);
			$('.invide-down').css('display', 'inline');
			$('.invide-up').css('display', 'none');
		} else {
			$('.invide-animate').slideDown(300); 
			$('body').animate({scrollTop: 1000}, 300);
			$('.invide-up').css('display', 'inline');
			$('.invide-down').css('display', 'none');
		}
	});

	//弹出框出来
	$('.invide-check').on('click', function() {
		$('.pop-shadow').fadeIn();
		$('.pop-content').fadeIn();
	});
	//弹出框消失
	$('.pop-delete').on('click', function() {
		$('.pop-shadow').fadeOut();
		$('.pop-content').fadeOut();
	});

	//register page
	//邀请码点击显示与否
	$('.register-add').on('click', function() {
			$('.register-invide-code').slideToggle(300);
			if($('.invide-down').css('display') == 'none') {
				$('.invide-down').css('display', 'inline');
				$('.invide-up').css('display', 'none');
			} else {
				$('.invide-up').css('display', 'inline');
				$('.invide-down').css('display', 'none');
			}
		})
	
	//判断手机号码
	var val = $('.register-tel');
	var paword = $('.register-password');
	var invide = $('.register-identify-input');
	$('.register-btn').on('click',function() {
		if(val.val() == "") {
			alert("手机号码不能为空！");
			$(this).focus();
			return false;
		}
		if(!val.val().match(/^1[3|5|8|4|7][0-9]\d{8}$/)) {
			alert("手机号码格式不正确！");
			$(this).focus();
			return false;
		}
		if(paword.val() == ""){
			alert("密码不能为空!");
			$(this).focus();
			return false;
		}
	});

	$('.invide-check').on('click', function() {
		$('.pop-shadow').fadeIn();
		$('.pop-content').fadeIn();
	});
	$('.pop-delete').on('click', function() {
		$('.pop-shadow').fadeOut();
		$('.pop-content').fadeOut();
	});
})