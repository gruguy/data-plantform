/*! smartWeather 0.0.1 | (c) 2015*/
(function($) {
	$.fn.extend({

		smartWeather: function(options) {

			var defaults = {
				IP: '124.115.6.18',
				days: 4
			};
			var options = $.extend(defaults, options);
			var _this = this;
			var url0 = 'http://api.k780.com:88/?app=weather.today&weaid=' + options.IP + '&appkey=16936&sign=1427eba47d8e0e71227698148a9527f9&format=json';

			var url1 = 'http://api.k780.com:88/?app=weather.future&weaid=' + options.IP + '&appkey=16936&sign=1427eba47d8e0e71227698148a9527f9&format=json';

			var imgUrl = 'img/weaIcons/';

			$.ajax({
				url: url0,
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				type: "GET",
				success: function(res) {

					var data = res.result;

					var weather = data.weatid;
					var tempature = data.temp_curr;
					var weaIcon;
					var nowH = new Date().getHours();

					switch(weather) {
						case '1':
							if(nowH > 17 || nowH < 7) {
								weaIcon = imgUrl + '101.png';
							} else {
								weaIcon = imgUrl + '1.png';
							}
							break;
						case '2':
							if(nowH > 18 || nowH < 6) {
								weaIcon = imgUrl + '201.png';
							} else {
								weaIcon = imgUrl + '2.png';
							}
							break;
						case '3':
							weaIcon = imgUrl + '3.png';
							break;
						case '4':
						case '5':
						case '6':
							weaIcon = imgUrl + '4.png';
							break;
						case '7':
							weaIcon = imgUrl + '5.png';
							break;
						case '8':
							weaIcon = imgUrl + '6.png';
							break;
						case '9':
							weaIcon = imgUrl + '7.png';
							break;
						case '10':
						case '11':
						case '12':
						case '13':
							weaIcon = imgUrl + '8.png';
							break;
						case '14':
						case '15':
							weaIcon = imgUrl + '9.png';
							break;
						case '16':
							weaIcon = imgUrl + '10.png';
							break;
						case '17':
						case '18':
							weaIcon = imgUrl + '11.png';
							break;
						case '19':
							weaIcon = imgUrl + '12.png';
							break;
						case '20':
							weaIcon = imgUrl + '13.png';
							break;
						case '21':
							weaIcon = imgUrl + '14.png';
							break;
						case '22':
							weaIcon = imgUrl + '15.png';
							break;
						case '23':
						case '24':
						case '25':
						case '26':
							weaIcon = imgUrl + '16.png';
							break;
						case '27':
							weaIcon = imgUrl + '10.png';
							break;
						case '28':
						case '29':
							weaIcon = imgUrl + '11.png';
							break;
						case '30':
							weaIcon = imgUrl + '12.png';
							break;
						case '31':
						case '32':
						case '33':
							weaIcon = imgUrl + '17.png';
							break;
						default:
							weaIcon = imgUrl + '1.png';
					}
					data.weather_icon = weaIcon;
					var tIcons = $('<div class="tIcons"><img src="' + weaIcon + '"></div>');
					var tempN = $('<div class="tRight"><div>' + data.days.replace('-', '年').replace('-', '月') + '&nbsp;&nbsp;' + data.week.replace('星期', '周') + '</div><div class="tempN">' + data.temperature.replace('/', ' ~ ') + ' | ' + data.weather + '</div></div>');
					$(_this).append(tIcons);
					$(_this).append(tempN);
				},
				error: function() {
					layer.msg('获取天气数据失败！');
				}
			});
		}
	});
})(jQuery);