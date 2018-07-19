(function($) {
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
		scaleExtent: [0.2, 2],
		data: []
	};

	function getUUID() {
		var id = setTimeout('0');
		clearTimeout(id);
		return id;
	};

	$.fn.extend({
		chinaHomeMap: function(option) {
			var p = $.extend({}, defaultOption, option);

			var width = p.width,
				height = p.height;

			var projection = d3.geo.mercator()
				.center([107, 31])
				.scale(width / 2)
				.translate([width / 2, height / 2]);

			var path = d3.geo.path()
				.projection(projection);

			var zoom = d3.behavior.zoom()
				.translate(projection.translate())
				.scale(projection.scale())
				.scaleExtent([0.5 * height, 8 * height])
				.on("zoom", zoomed); //.on("zoomend", zoomedend);
			// 绘制样式

			var uuid = getUUID();
			$(this).addClass("cl" + uuid);

			var svg = d3.select("." + "cl" + uuid).append("svg")
				.attr('class', 'chinaMap')
				.attr("stroke", "#000")
				.attr("stroke-width", 2)
				.attr("transform", "translate(0,0)")
				.attr("width", width)
				.attr("height", height)
				.append("g").call(zoom);

			//			var projection = d3.geo.mercator()
			//				.center([107, 31])
			//				.scale(width / 2)
			//				.translate([width / 2, height * 2 / 3]);
			//			var path = d3.geo.path()
			//				.projection(projection);
			//	var color = d3.scale.category20();
			var colorArr = ['#d2e7ff', '#f5fbfd', '#f5fbfd', '#f5fbfd'];
			var randomNum;
			d3.json("china.geojson", function(error, root) {
				if(error) return console.error(error);

				$.post(BASEURL + "homepageController/homeMapData", function(data) {

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

								if(num < 1000) {
									return '#f5fbfd';
								} else if(num < 2000) {
									return '#d2e7ff';
								} else {
									return '#a1caf8';
								}
							}
						})
						.attr("d", path)
						.on("mouseover", function(d, i) {

							var itemId = parseInt(d.properties.id);
							var regKey = itemId + "0000";
							var homeMapRegData = data.homeMapRegDatas[regKey];
							var htmls = [];
							htmls.push('<div class="showTip showTip1"><h1>' + d.properties.name + '</h1>');
							htmls.push('<div class="infos">');
							if(homeMapRegData) {

								for(var key in namesDataType) {
									for(var i = 0; i < homeMapRegData.length; i++) {
										var homeMapReg = homeMapRegData[i];
										if(key == homeMapReg.IENTERPRISETYPEID) {
											htmls.push('<p>' + namesDataType[homeMapReg.IENTERPRISETYPEID] + " : " + homeMapReg.NUM + '家</p>');
										}
									}
								}
							} else {
								for(var key in namesDataType) {
									htmls.push('<p>' + namesDataType[key] + " : " + 0 + '家</p>');
								}
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
							initProvince(d.properties.id, areaColor, d.properties.cp, d.properties.scale, data.homeMapBaseCity, data.homeMapRegDataCitys, namesDataType);
						});

					bigdatatools.hideLoading();
					//图表初始化
					initChart(data);
				});
			});


		function zoomed() {
			console.log("zoomed");
			projection.translate(d3.event.translate).scale(d3.event.scale);
			g.selectAll("path").attr("d", path);
			openclick = 0;
			if(settimeout) {
				clearTimeout(settimeout);
			}
			settimeout = setTimeout(function() {
				settimeout = null;
				console.log("zoomedend");
				openclick = 1;
			}, 240);

		}
		}
	});
})(jQuery, undefined)