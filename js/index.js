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
		if (string && string.length) {
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
		width: $('body').width(),
		height: $('body').height(),
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
				.scale($('body').width()/2)
				.translate([width / 2, height*2 / 3]);

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

			var texts;

			d3.json("china.geojson", function(error, root) {
				if (error) return console.error(error);
				$.get(BASEURL + "systempageController/homeMapData", function(data) {

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
							if (!num) {
								return '#f5fbfd';
							} else {

								if (num < 2000) {
									return '#f5fbfd';
								} else if (num < 5000) {
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
							if (homeMapRegData) {

								for (var key in namesDataType) {
									for (var i = 0; i < homeMapRegData.length; i++) {
										var homeMapReg = homeMapRegData[i];
										if (key == homeMapReg.IENTERPRISETYPEID) {
											htmls.push('<p>' + namesDataType[homeMapReg.IENTERPRISETYPEID] + " : " + homeMapReg.NUM + '家</p>');
										}
									}
								}
							} else {
								for (var key in namesDataType) {
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
						});

					bigdatatools.hideLoading();
				});
			});

			var settimeout = null;

			function zoomed() {
				console.log("zoomed");
				projection.translate(d3.event.translate).scale(d3.event.scale);
				g.selectAll("path").attr("d", path);
				g.select('.texts').attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
				openclick = 0;
				if (settimeout) {
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

/**
 * 初始化地图
 * @param {Object} datas 传入的数组数据
 * @param {Object} type  当前初始化的类型 ，分为首页，企业，产品，信用，舆情
 */
var initMap = function(datas, type) {
	//初始化设置分类
	var typeSet = {
		index: {},
		ent: {},
		product: {},
		credit: {},
		feelings: {}
	};
	if (type) {
		switch (type) {
			case 0: //index
				return [8, 5, 2];
				break;
			case 1: //ent
				break;
			case 2: //product
				break;
			case 3: //credit
				break;
			case 4: //fellings
				break;
		}
	}
}

$(".chinaMapWrapper").chinaMap({});