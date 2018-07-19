var resizeTimeout = null;
$(window).on('resize', function() {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function() {
		location.reload();
	}, 250);
});
$(function() {
	var keywords = localStorage.getItem("keywords");
	$('.drugName').text(keywords);
	$('.nav>ul>li').hover(function() {
		$(this).find('.spans').animate({
			'margin-top': '-50px'
		}, 300);
	}, function() {
		$(this).find('.spans').animate({
			'margin-top': '0'
		}, 300);
	});
	$('.nav>ul>li').on('click', function(e) {
		e.stopPropagation();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).find('.spans').animate({
			'margin-top': '-50px'
		}, 300);
		$(this).siblings().find('.subs').hide();
		if (e.target == $(this).find('.wrap')[0] || e.target == $(this).find('.spans')[0] || e.target == $(this).find('.words')[0]) {
			$(this).find('.subs').toggle();
		}
	});
	var $menu = $('.subs');
	$(document).click(function(e) {
		if (!(e.target == $menu[0] || $.contains(e.target, $menu[0]))) {
			$menu.hide();
		} else {
			$menu.show();
		}
	});
	//点击关闭按钮
	$('.subs .close').on('click', function() {
		$(this).parents('.subs').hide();
	});

	//点击按钮收起searchBox
	$('.searchBox .toggle').on('click', function() {
		$(this).siblings('.form-group').toggle();
		if ($(this).siblings('.form-group').is(':visible')) {
			$(this).removeClass('slideUp');
			$(this).parent().animate({
				height: '88px',
				'padding-top': '30px'
			}, 100);
		} else {
			$(this).addClass('slideUp');
			$(this).parent().animate({
				height: '40px',
				'padding-top': '0'
			}, 100);
		}
	});
	//搜索产品或者企业
	$('.searchBox .btn').on('click', function() {
		var val = $(this).siblings('input').val();
		$.get(BASEURL + '/queryTypeController/queryTypeMapData?key=' + val, function(data) {
			if (data.type == 0) {
				layer.msg('无此数据！');
			} else if (data.type == 1) {
				//跳转企业
				localStorage.setItem("keywords", val);
				window.location.href = "index2.html";

			} else if (data.type == 2) {
				//跳转产品
				localStorage.setItem("keywords", val);
				window.location.href = "index_2.html";

			} else {
				alert('其他！');
				return;
			}
		});
	});
	$("body").keydown(function() {
		if (event.keyCode == "13") { //keyCode=13是回车键
			$('.searchBox .btn').click();
		}
	});
	//点击按钮收起switchover
	$('.switchover .toggle').on('click', function() {
		$(this).siblings('ul').find('h4').toggle();
		if ($(this).siblings('ul').find('h4').is(':hidden')) {
			$(this).addClass('slideUp');
			$(this).parent().animate({
				height: '348px'
			}, 100);
		} else {
			$(this).siblings('ul').find('h4').show();
			$(this).removeClass('slideUp');
			$(this).parent().animate({
				height: '60px'
			}, 100);
		}
	});
	$('.listShow ul h5').on('click', function() {
		var url = $(this).data('url');
		location.href = url;
	})
});