(function($, window) {
	function initHover(string) {
		var defaults = '<div class="showTip">' +
			'<h1>最新销售记录</h1>' +
			'<div class="infos">' +
			'<p>产品名称：阿莫西林</p>' +
			'<p>批次：201605236954</p>' +
			'<p>销售数量：2500盒</p>' +
			'<p>销售时间：2016-05-23</p>' +
			'<p><a href="#" class="more">更多</a></p>' +
			'</div>' +
			'</div>';
		if(string && string.length) {
			return string;
		} else {
			return defaults;
		}
	}
	var namesDataType = {
		"4": "药品零售企业",
		"28": "药品零售连锁企业总部",
		"29": "药品零售连锁企业门店",
		"30": "药品零售跨地(市)连锁门店",
		"31": "药品批发企业下属门店",
		"32": "药品零售企业(单体店)",
		"37": "药品零售连锁企业加盟店"
	};

	var defaultOption = {
		width: '1920',
		height: '1080',
		scaleExtent: [0.2, 10],
		data: []
	};

	function getUUID() {
		var id = setTimeout('0');
		clearTimeout(id);
		return id;
	};

	$.fn.extend({
		chinaMap: function(option) {
			var p = $.extend(defaultOption, {
				width: $('body').width(),
				height: $('body').height()
			}, option);

			var width = p.width,
				height = p.height,
				data = '';

			var projection = d3.geo.mercator()
				.center([107, 31])
				.scale(width / 2)
				.translate([width / 2, height * 2 / 3]);

			var path = d3.geo.path()
				.projection(projection);

			var zoom = d3.behavior.zoom()
				.translate(projection.translate())
				.scale(projection.scale())
				.scaleExtent([0.5 * height, 8 * height])
				.on("zoom", zoomed); //.on("zoomend", zoomedend);

			var uuid = getUUID();
			$(this).addClass('cl' + uuid);
			var svg = d3.select("." + "cl" + uuid).append("svg")
				.attr('class', 'chinaMap')
				.attr("stroke", "#000")
				.attr("stroke-width", 2)
				.attr("width", width)
				.attr("height", height);

			var g = svg.append("g").call(zoom);
			g.append("rect")
				.attr("class", "background")
				.attr("width", width)
				.attr("height", height);

			var texts, datas;

			d3.json("china.geojson", function(error, root) {
				if(error) return console.error(error);
				$.get(BASEURL + "productController/queryProductMapData?ethName=" + localStorage.getItem("keywords"), function(data) {
					datas = data;
					svg.selectAll("path")
						.data(root.features)
						.enter()
						.append("path")
						.attr("stroke", "#e0eef3")
						.attr("stroke-width", 1)
						.attr("fill", function(d, i) {
							var itemId = parseInt(d.properties.id);
							var regKey = itemId + "0000";
							var num = data.homeMapBase[regKey];
							if(!num) {
								return '#f5fbfd';
							} else {
								num = num.saleNumber;
								if(num == 0) {
									return '#f5fbfd';
								} else if(num < 1000) {
									return '#C8E1F9';
								} else if(num < 2000) {
									return '#B7D6F9';
								} else {
									return '#75A9E4';
								}
							}
						})
						.attr("d", path)
						.on("mouseover", function(d, i) {

							var itemId = parseInt(d.properties.id);
							var regKey = itemId + "0000";
							var homeMapRegData = data.homeMapBase[regKey];
							var htmls = [];
							htmls.push('<div class="showTip showTip1"><h1>' + d.properties.name + '近一年销售记录</h1>');
							htmls.push('<div class="infos">');
							if(homeMapRegData) {
								htmls.push('<p>产品名称：' + data.drugName + '</p><p>销售数量：' + homeMapRegData.saleNumber + data.unit + '</p><p>最新时间：' + homeMapRegData.latestDate);
							} else {
								htmls.push('<p>产品名称：' + data.drugName + '</p><p>销售数量：0' + '</p><p>最新时间：暂无时间');

							}
							htmls.push('</div></div>');

							var str = initHover(htmls.join(""));
							$(str).appendTo('body');
							var oTop = $(".showTip")[0];
							document.onmousemove = function(evt) {
								var oEvent = evt || window.event;
								var scrollleft = document.documentElement.scrollLeft || document.body.scrollLeft;
								var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
								oTop.style.left = oEvent.clientX + scrollleft + 10 + "px";
								oTop.style.top = oEvent.clientY + scrolltop + 10 + "px";
							}
							var old = d3.select(this).attr("fill");
							d3.select(this)
								.attr("fill", "#a1caf8");
							d3.select(this)
								.attr("oldfill", old);
						})
						.on("mouseout", function(d, i) {
							$(".showTip").remove();
							d3.select(this).attr("fill", d3.select(this).attr("oldfill"));
						}).on("click", function(d, i) {
							localStorage.setItem('provinceCode', d.properties.id + '0000');
							cityChartOn = true;
							$('.toggle').removeClass("slideUp");
							$('h4').show();
							$('.switchover').css({
								height: '60px'
							});
							var areaColor = d.areaColor;
							$(".showTip").remove();
							d3.select(this).attr("fill", d3.select(this).attr("oldfill"));
							initProvince_2(d.properties.id, areaColor, d.properties.cp, d.properties.scale, data.homeMapBaseCity, data);
						});
					var producerTxt = '',
						salerTxt = '';
					if(data.entList.manufacturer.length > 0) {
						$.each(data.entList.manufacturer, function(i, ele) {
							producerTxt += '<li><h5><a data-entid=' + data.entList.manufacturer[i].entId + ' data-href="index2_1.html">' + ele.entName + '</a></h5></li>';
						});
					} else {
						producerTxt = '<li><h5>暂无数据！</h5></li>';
					}
					if(data.entList.saler.length > 0) {
						$.each(data.entList.saler, function(i, ele) {
							salerTxt += '<li><h5><a data-entid=' + data.entList.saler[i].entId + ' data-href="index2_2.html">' + ele.entName + '</a></h5></li>';
						});
					} else {
						salerTxt = '<li><h5>暂无数据！</h5></li>';
					}
					$(producerTxt).appendTo($('.producer ul'));
					$(salerTxt).appendTo($('.saler ul'));
					$('.listShow').on('click', 'a', function() {
						sessionStorage.setItem('entId', $(this).data('entid'));
						location.href = $(this).data('href');
					});

					$('.switchover .toggle').on('click', function() {
						if($(this).hasClass('slideUp')) {
							var provinceCode = localStorage.getItem('provinceCode');
							if(cityChartOn) {
								cityChart(provinceCode);
							} else {
								initChart(datas);
							}
						}
					});

					bigdatatools.hideLoading();
				});
			});

			var settimeout = null;

			function zoomed() {
				projection.translate(d3.event.translate).scale(d3.event.scale);
				g.selectAll("path").attr("d", path);
				//				g.select('.texts').attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
				openclick = 0;
				if(settimeout) {
					clearTimeout(settimeout);
				}

				settimeout = setTimeout(function() {
					settimeout = null;
					console.log("zoomedend");
					openclick = 1;
				}, 240);

				//				d3.select(this).attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); //translate(" + d3.event.translate + ")
			}
			var openclick = 1;

			function zoomedstrat() {
				console.log("zoomedstrat");

			}

			function zoomedend() {

			}
		}
	});
})(jQuery, window)