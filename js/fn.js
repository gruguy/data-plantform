var cityChartOn = false;
var BASEURL = 'http://192.168.1.97/bigdata/';
var provinceJson = {
		'安徽': 'anhui',
		'澳门': 'aomen',
		'北京': 'beijing',
		'重庆': 'chongqing',
		'福建': 'fujian',
		'甘肃': 'gansu',
		'广东': 'guangdong',
		'广西': 'guangxi',
		'贵州': 'guizhou',
		'海南': 'hainan',
		'河北': 'hebei',
		'黑龙江': 'heilongjiang',
		'河南': 'henan',
		'湖北': 'hubei',
		'湖南': 'hunan',
		'江苏': 'jiangsu',
		'江西': 'jiangxi',
		'吉林': 'jilin',
		'辽宁': 'liaoning',
		'内蒙古': 'neimenggu',
		'宁夏': 'ningxia',
		'青海': 'qinghai',
		'山东': 'shandong',
		'上海': 'shanghai',
		'山西': 'shanxi',
		'陕西': 'shanxi1',
		'四川': 'sichuan',
		'天津': 'tianjin',
		'香港': 'xianggang',
		'新疆': 'xinjiang',
		'西藏': 'xizang',
		'云南': 'yunnan',
		'浙江': 'zhejiang'
	},
	provinceJsonCode = {
		'安徽': '34',
		'澳门': '82',
		'北京': '11',
		'重庆': '50',
		'福建': '35',
		'甘肃': '62',
		'广东': '44',
		'广西': '45',
		'贵州': '52',
		'海南': '46',
		'河北': '13',
		'黑龙江': '23',
		'河南': '41',
		'湖北': '42',
		'湖南': '43',
		'江苏': '32',
		'江西': '36',
		'吉林': '22',
		'辽宁': '21',
		'内蒙古': '15',
		'宁夏': '64',
		'青海': '63',
		'山东': '37',
		'上海': '31',
		'山西': '14',
		'陕西': '61',
		'四川': '51',
		'天津': '12',
		'香港': '81',
		'新疆': '65',
		'西藏': '54',
		'云南': '53',
		'浙江': '33'
	}
//loading状态样式热值
var opt = {
	text: 'loading',
	color: '#c23531',
	textColor: '#fff',
	maskColor: 'rgba(255, 255, 255, 0.1)',
	zlevel: 0
}

function initHover(province, string) {
	return bigdatatools.initHover(province, string);
}

function showLoading(string) {
	return bigdatatools.showLoading(string);
}

function hideLoading(string) {
	return bigdatatools.hideLoading(string);
}
var bigdatatools = {};

$.extend(bigdatatools, {
	initHover: function(province, string) {
		var defaults = '<div class="showTip">' +
			'<h1>' + province + '最新销售记录</h1>' +
			'<div class="img"><img src="img/yao.png" width="94" height="94"/></div>' +
			'<div class="infos">' +
			'<p>产品名称：阿莫西林</p>' +
			'<p>批次：201605236954</p>' +
			'<p>销售数量：2500盒</p>' +
			'<p>销售时间：2016-05-23</p>' +
			//			'<p><a href="#" class="more">更多</a></p>' +
			'</div>' +
			'</div>';
		if(string && string.length) {
			return string;
		} else {
			return defaults;
		}
	},
	showLoading: function() {
		$('.loadings').show();
	},
	hideLoading: function() {
		$('.loadings').hide();
	}
});

function initProvince(id, areaColor, arr, scale, homeMapBaseCity, homeMapRegDataCity, namesDataType) {
	$('.chinaMapWrapper').hide();
	var zoom = d3.behavior.zoom()
		.scaleExtent([0.2, 2])
		.on("zoom", zoomed);
	var x = arr[0],
		y = arr[1];
	var svg_pro = d3.select("#province").append("svg")
		.attr('class', 'province')
		.attr("stroke", "#ccc")
		.attr("stroke-width", 2)
		.attr("transform", "translate(0,0)")
		.attr("width", 500)
		.attr("height", 500)
		.append("g").call(zoom);
	var projection1 = d3.geo.mercator()
		.center([x, y])
		.scale(scale)
		.translate([1000, 500]);
	var path1 = d3.geo.path()
		.projection(projection1);
	d3.json("js/city_json/pro_" + id + ".json", function(error, root) {
		if(error) return console.error(error);
		svg_pro.selectAll("path")
			.data(root.features)
			.enter()
			.append("path")
			.attr("stroke", "#e0eef3")
			.attr("stroke-width", 1)
			.attr("fill", function(d, i) {
				var itemId = parseInt(d.properties.id);
				var regKey = itemId + "00";
				if(homeMapBaseCity) {
					var num = homeMapBaseCity[regKey];
					if(!num) {
						return '#f5fbfd';
					} else {
						if(num < 1000) {
							return '#C8E1F9';
						} else if(num < 2000) {
							return '#d2e7ff';
						} else {
							return '#a1caf8';
						}
					}

				} else {
					return '#f5fbfd';
				}
			})
			.attr("d", path1)
			.on("mouseover", function(d, i) {

				var itemId = parseInt(d.properties.id);
				var regKey = itemId + "00";
				var htmls = [];
				htmls.push('<div id="showTip1" class="showTip showTip1"><h1>' + d.properties.name + '</h1>');
				htmls.push('<div class="infos">');
				if(homeMapRegDataCity) {
					var homeMapRegData = homeMapRegDataCity[regKey];
					if(homeMapRegData) {
						for(var key in namesDataType) {
							for(var i = 0; i < homeMapRegData.length; i++) {
								var homeMapReg = homeMapRegData[i];
								if(key == homeMapReg.IENTERPRISETYPEID) {
									htmls.push('<p>' + namesDataType[homeMapReg.IENTERPRISETYPEID] + " : " + homeMapReg.NUM + '家</p>');
								}
							}
						}
					}

				} else {
					for(var key in namesDataType) {
						htmls.push('<p>' + namesDataType[key] + " : " + 0 + '家</p>');
					}
				}
				htmls.push('</div></div>');
				var str = initHover("", htmls.join(""));
				$(str).appendTo('body');
				var oTop1 = document.getElementById('showTip1');
				document.onmousemove = function(evt) {
					var oEvent = evt || window.event;
					var scrollleft = document.documentElement.scrollLeft || document.body.scrollLeft;
					var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
					oTop1.style.left = oEvent.clientX + scrollleft + 10 + "px";
					oTop1.style.top = oEvent.clientY + scrolltop + 10 + "px";
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
			})
			.on("click", function(d, i) {

				d3.event.stopPropagation(); //阻止事件冒泡
			});
		var texts = svg_pro.append("svg:g")
			.attr("class", "texts")
			.selectAll("text")
			.data(root.features)
			.enter().append("text")
			.text(function(d) {
				if(d.spot) {
					return d.properties.name;
				}
			})
			.attr("transform", function(d) {
				var centroid = path1.centroid(d),
					x = centroid[0],
					y = centroid[1];
				return "translate(" + x + ", " + y + ")";
			})
			.attr('fill', '#666')
			.attr('stroke', 'none')
			.attr('font-size', '12px');
	});
	$('#province').show();
	$('#province svg').on('click', function() {
		cityChartOn = false;
		$('.toggle').removeClass("slideUp");
		$('h4').show();
		$('.switchover').css({
			height: '60px'
		});
		$('#chinaMapWrapper').show();
		$(this).remove();
		$('#province').hide();
	});
}

function initProvince_2(id, areaColor, arr, scale, homeMapBaseCity, data) {
	$('.chinaMapWrapper').hide();
	var zoom = d3.behavior.zoom()
		.scaleExtent([0.2, 2])
		.on("zoom", zoomed);
	var x = arr[0],
		y = arr[1];
	var svg_pro = d3.select("#province").append("svg")
		.attr('class', 'province')
		.attr("stroke", "#ccc")
		.attr("stroke-width", 2)
		.attr("transform", "translate(0,0)")
		.attr("width", $('body').width())
		.attr("height", $('body').height())
		.append("g").call(zoom);
	var projection1 = d3.geo.mercator()
		.center([x, y])
		.scale(scale)
		.translate([$('body').width() / 2, 500]);
	var path1 = d3.geo.path()
		.projection(projection1);
	d3.json("js/city_json/pro_" + id + ".json", function(error, root) {
		if(error) return console.error(error);
		svg_pro.selectAll("path")
			.data(root.features)
			.enter()
			.append("path")
			.attr("stroke", "#e0eef3")
			.attr("stroke-width", 1)
			.attr("fill", function(d, i) {
				var itemId = parseInt(d.properties.id);
				var regKey = itemId + "00";
				if(homeMapBaseCity) {
					var num = homeMapBaseCity[regKey];
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

				} else {
					return '#f5fbfd';
				}
			})
			.attr("d", path1)
			.on("mouseover", function(d, i) {

				var itemId = parseInt(d.properties.id);
				var regKey = itemId + "00";
				var homeMapRegData = homeMapBaseCity[regKey];
				var htmls = [];
				htmls.push('<div id="showTip1" class="showTip showTip1"><h1>' + d.properties.name + '近一年销售记录</h1>');
				htmls.push('<div class="infos">');
				if(homeMapRegData) {
					htmls.push('<p>产品名称：' + data.drugName + '</p><p>销售数量：' + homeMapRegData.saleNumber + data.unit + '</p><p>最新时间：' + homeMapRegData.latestDate);
				} else {
					htmls.push('<p>产品名称：' + data.drugName + '</p><p>销售数量：0' + data.unit + '</p><p>最新时间：暂无时间');

				}
				htmls.push('</div></div>');
				var str = initHover("", htmls.join(""));
				$(str).appendTo('body');
				var oTop1 = document.getElementById('showTip1');
				document.onmousemove = function(evt) {
					var oEvent = evt || window.event;
					var scrollleft = document.documentElement.scrollLeft || document.body.scrollLeft;
					var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
					oTop1.style.left = oEvent.clientX + scrollleft + 10 + "px";
					oTop1.style.top = oEvent.clientY + scrolltop + 10 + "px";
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
			})
			.on("click", function(d, i) {

				d3.event.stopPropagation(); //阻止事件冒泡
			});
		var texts = svg_pro.append("svg:g")
			.attr("class", "texts")
			.selectAll("text")
			.data(root.features)
			.enter().append("text")
			.text(function(d) {
				if(d.spot) {
					return d.properties.name;
				}
			})
			.attr("transform", function(d) {
				var centroid = path1.centroid(d),
					x = centroid[0],
					y = centroid[1];
				return "translate(" + x + ", " + y + ")";
			})
			.attr('fill', '#666')
			.attr('stroke', 'none')
			.attr('font-size', '12px');
	});
	$('#province').show();
	$('#province svg').on('click', function() {
		cityChartOn = false;
		$('.toggle').removeClass("slideUp");
		$('h4').show();
		$('.switchover').css({
			height: '60px'
		});
		$('#chinaMapWrapper').show();
		$(this).remove();
		$('#province').hide();
	});
}

function zoomed() {
	d3.event.stopPropagation();
	d3.select(this).attr("transform",
		"translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function convertData1(data) {
	var dataArr = [];
	for(var i = 0; i < data.province.length; i++) {
		dataArr.push([{
			name: data.manufacturer.entName,
			coord: [data.manufacturer.lng, data.manufacturer.lat]
		}, {
			name: data.province[i].areaName,
			coord: [data.province[i].lng, data.province[i].lat, data.province[i].drugNumber, data.province[i].provinceCode] //,
		}]);
	}

	return dataArr;
}

function convertData$(data) {
	var dataArr = [];
	for(var i = 0; i < data.length; i++) {
		dataArr.push({
			name: data[i].areaName,
			value: [data[i].lng, data[i].lat, data[i].drugNumber] //,
		});
	}

	return dataArr;
}

function initProvinceEcharts(name, provinceName) {
	var w = $(window).width(),
		h = $(window).height();
	$('#province').css({
		width: w + 'px',
		height: h + 'px'
	});
	var provinceCode = null;
	for(key in provinceJsonCode) {
		if(provinceName == key) {
			provinceCode = provinceJsonCode[key] + '0000';
			break;
		}
	}
	$.get(BASEURL + "entController/queryProducerSaleByProvince?entId=" + sessionStorage.getItem("entId") + "&provinceCode=" + provinceCode, function(data) {
		var datas = convertData$(data);
		$.get('js/echartsJSON/' + name + '.json', function(proJson) {
			echarts.registerMap('province', proJson);
			var chart = echarts.init(document.getElementById('province'));
			chart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br /> 供货量 ：  {c} <br /> 日期 ： 2016-06-07'
				},
				geo: {
					type: 'map',
					map: 'province',
					roam: true,
					zoom: 0.8,
					itemStyle: {
						normal: {
							areaColor: '#fff',
							borderColor: '#e0eef3'
						},
						emphasis: {
							areaColor: '#75A9E4'
						}
					},
					scaleLimit: {
						min: 0.2,
						max: 10
					}
				},
				series: [{
					name: 'pm2.5',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: datas,
					symbolSize: function(val) {
						val = val < 1000 ? val / 100 : 10;
						return val;
					},
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: '#1b79bb'
						}
					}
				}]
			});
			$('#province').show();
			$('#chinaMapWrapper').hide();
			$('#province').on('click', function(e) {
				e.stopPropagation();
				$('#province').hide();
				$('#chinaMapWrapper').show();

			});
			chart.on('click', function(params) {
				event.stopPropagation();
				//处理事件

			});
		});
	});
}

/**
 * 将对象转为需要的数组形式
 * @param {Object} obj 传入数据对象
 */
function convertData(obj) {

	var arr = [];
	for(var i in obj) {
		arr.push({
			"name": i,
			"value": obj[i]
		});
	}
	return arr;
}
/**
 * 将对象转为需要的数组形式
 * @param {Object} obj 传入数据对象
 */
function convertData_2(obj) {

	var arr = [];
	var name;
	for(var k = 0; k < obj.length; k++) {
		if(obj[k].areaName) {
			name = obj[k].areaName;
		} else {
			name = obj[k].producerName;
		}
		arr.push({
			"name": name,
			"value": obj[k].drugNumber
		});
	}
	return arr;
}
/**
 * 将对象转为需要的数组形式 一般为x轴名称
 * @param {Object} obj 传入数据对象
 */
function convertDataX(obj) {

	var arr = [];
	for(var i in obj) {
		arr.push(i);
	}
	return arr.reverse();
}

/**
 * 将对象转为需要的数组形式 一般为x轴名称
 * @param {Object} obj 传入数据对象
 */
function convertDataX_2(obj) {

	var arr = [];
	var name;
	for(var k = 0; k < obj.length; k++) {
		if(obj[k].areaName) {
			name = obj[k].areaName;
		} else if(obj[k].producerName) {
			name = obj[k].producerName;
		} else {
			name = obj[k].year;
		}
		arr.push(name);
	}
	return arr.reverse();
}

/**
 * 将对象转为需要的数组形式 一般为Y轴数据
 * @param {Object} obj 传入数据对象
 */
function convertDataY(obj) {

	var arr = [];
	for(var i in obj) {
		arr.push(obj[i]);
	}
	return arr.reverse();
}

/**
 * 将对象转为需要的数组形式 一般为Y轴数据
 * @param {Object} obj 传入数据对象
 */
function convertDataY_2(obj) {

	var arr = [];
	var name;
	for(var k = 0; k < obj.length; k++) {

		arr.push(obj[k].drugNumber);
	}
	return arr.reverse();
}