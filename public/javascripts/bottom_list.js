$(function(){
	var htmlBottom = '';
	htmlBottom += '<div class="bottom_list"><ul class="bottom_list_ul"><li class="bottom_list_first">';
	htmlBottom += '<img src="../public/images/yiyuanduoquan/ico_tab1_footer_click@2x.png" alt="" /><p>一元夺券</p>';
	htmlBottom += '</li><li class="bottom_list_second"><img src="../public/images/yiyuanduoquan/ico_tab2_footer_click@2x.png" alt="" />';							
	htmlBottom += '<p>最新揭晓</p></li><li class="bottom_list_third"><img src="../public/images/yiyuanduoquan/ico_tab3_footer_click@2x.png" alt=""/>';
	htmlBottom += '<p>我的社交</p></li><li class="bottom_list_fouth"><img src="../public/images/yiyuanduoquan/ico_tab4_footer_click@2x.png" alt="" />';
	htmlBottom += '<p>幸福商城</p></li><li class="bottom_list_fifth"><img src="../public/images/yiyuanduoquan/ico_tab5_footer_click@2x.png" alt="" />';
	htmlBottom += '<p>个人中心</p></li><img src="../public/images/yiyuanduoquan/ico_shej@2x.png" alt="" id="out_pic"/></ul></div>';
	$('body').append(htmlBottom);
			var $li = $(".bottom_list_ul li");
			if($li.length === 4){
				$('#out_pic').hide();
				$li.addClass("four_pic");
			}else if($li.length === 5){
				$li.addClass("five_pic");
			}
		});