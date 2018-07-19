(function($, window) {
	function initHover(string) {
		var defaults = '<div id="showTip2" class="showTip showTip2">' +
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

	var defaultOption = {
		width: '550',
		height: '400',
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
				width: $('.map').width(),
				height: $('.map').height()
			}, option);

			var width = p.width,
				height = p.height,
				data = '';

			var projection = d3.geo.mercator()
				.center([97, 33])
				.scale(width / 2)

			var path = d3.geo.path()
				.projection(projection);

			var zoom = d3.behavior.zoom()
				.translate(projection.translate())
				.scale(projection.scale())
				.scaleExtent([0.5 * height, 8 * height])
				.on("zoom", zoomed);

			var uuid = getUUID();
			$(this).addClass('cl' + uuid);
			var svg = d3.select("." + "cl" + uuid).append("svg")
				.attr('class', 'chinaMap')
				.attr("stroke-width", 2)
				.attr("width", width)
				.attr("height", height);

			var g = svg.append("g").call(zoom);
			g.append("rect")
				.attr("class", "background")
				.attr("width", width)
				.attr("height", height);

			var texts;
			var percent
			d3.json("china.geojson", function(error, root) {
				if(error) return console.error(error);
				$.get(BASEURL+"mainController/queryEthSaleByProvince", function(datas) {
					svg.selectAll("path")
						.data(root.features)
						.enter()
						.append("path")
						.attr("stroke", "#e0eef3")
						.attr("stroke-width", 1)
						.attr("fill", function(d, i) {
							var itemId = parseInt(d.properties.id);
							var regKey = itemId + "0000";
							var num = datas[regKey];

							if(num < 0.5) {
								return '#6c9bd1';
							} else if(num > 0.5 && num < 1) {
								return '#5991d2';
							} else if(num >=1 && num < 1.5) {
								return '#1181c3';
							} else if(num >= 1.5 && num < 2.4) {
								return '#2b8bc3';
							} else if(num >= 2.4 && num < 6.1) {
								return '#1074ae';
							} else if(num >= 6.1) {
								return '#176491';
							}else{
								return '#6c9bd1';
							}
						})
						.attr("d", path)
						.on("mouseover", function(d, i) {

							var itemId = parseInt(d.properties.id);
							console.log(d);
							var regKey = itemId + "0000";
							//							var homeMapRegData = data.homeMapBase[regKey];
							var htmls = [];
							htmls.push('<div id="showTip2" class="showTip showTip2"><h1>' + d.properties.name + '近一年购买指数</h1>');
							htmls.push('<div class="infos">');
							htmls.push('<p>购买指数：' + (datas[regKey]?datas[regKey]:0) + '%</p>');
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
			})
		}
	});
})(jQuery, window)

$("#chinaMap").chinaMap({});