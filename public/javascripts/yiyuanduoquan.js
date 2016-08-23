
		//		$(function() {
		//			var all_people = 1000;
		//			var overplus_people = 600;
		//			var last_people;
		//			var percentage = (all_people - overplus_people) / all_people*100+"%"
		//			last_people = (all_people - overplus_people) / all_people * 13;
		//			$(".in_frame").css('width', last_people + "rem");
		//			$(".yydq_all").html(all_people);
		//			$(".yydq_overplus").html(overplus_people);
		//			$(".yydq_percent").html(percentage);
		//			
		//		});
		
		$(function(){
			
			var $up = $(".up_srow");
			var $down = $(".down_srow")
			$(".need_people").one("click",function(){
				$up.addClass("default_color");
			})
			$(".need_people").click(function() {
				$up.toggleClass("default_color");
				$down.toggleClass("default_color");
			});
		});
		$(function() {
			new Swipe(document.getElementById('banner_box'), {
				speed: 500,
				auto: 3000,
				callback: function() {
					var lis = $(this.element).next("ol").children();
					lis.removeClass("on").eq(this.index).addClass("on");
				}
			});
		});
		$(function() {
			$("#marquee").marquee({
				yScroll: "bottom",
				showSpeed: 850 // 初始下拉速度
					,
				scrollSpeed: 12 // 滚动速度 
					,
				pauseSpeed: 3000 // 滚动完到下一条的间隔时间 }); 
				,
				 pauseOnHover: false 
			});
		});