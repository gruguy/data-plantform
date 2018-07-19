var planePath = 'path://M408.467,456.287v15.025h-12v-6h-69v-112h19v-23.705l22-9.295l11.766-22h18.51c0.62-1.743,2.269-3,4.225-3h1c2.485,0,4.5,2.016,4.5,4.5v15.525c9.983,0.268,18,8.426,18,18.475s-8.017,18.207-18,18.475v27.051c9.983,0.268,18,8.426,18,18.475s-8.017,18.207-18,18.475v3.051c9.983,0.268,18,8.425,18,18.474S418.45,456.019,408.467,456.287L408.467,456.287z';

var convertData = function(data) {
	var res = [];
	for(var i = 0; i < data.length; i++) {
		var dataItem = data[i];
		var fromCoord = geoCoordMap[dataItem[0].name];
		var toCoord = geoCoordMap[dataItem[1].name];
		if(fromCoord && toCoord) {
			res.push([{
				name: dataItem[0].name,
				coord: fromCoord
			}, {
				name: dataItem[1].name,
				coord: toCoord
			}]);
		}
	}
	return res;
};

var color = '#0077ff';
var series = [];
$.get(BASEURL + 'entController/queryProducerMapData?entId=' + sessionStorage.getItem("entId"), function(data) {
	var item = [data.manufacturer.entName, convertData1(data)];
	series.push({
		name: item[0],
		type: 'lines',
		zlevel: 1,
		effect: {
			show: true,
			period: 6,
			trailLength: 0.4,
			color: '#fff',
			symbolSize: 3
		},
		lineStyle: {
			normal: {
				color: color,
				width: 0,
				curveness: 0.2
			}
		},
		data: item[1]
	}, {
		name: item[0],
		type: 'lines',
		zlevel: 2,
		effect: {
			show: true,
			period: 16,
			trailLength: 0,
			symbol: planePath,
			color: '#135aaa',
			symbolSize: [10, 18]
		},
		lineStyle: {
			normal: {
				color: color,
				width: 1,
				opacity: 0.4,
				curveness: 0.2
			}
		},
		data: item[1]
	}, {
		name: item[0],
		type: 'effectScatter',
		coordinateSystem: 'geo',
		zlevel: 2,
		rippleEffect: {
			scale: 4,
			brushType: 'stroke'
		},
		label: {
			normal: {
				show: true,
				position: 'right',
				formatter: '{b}'
			}
		},
		symbolSize: function(val) {
			return val[2] < 160 ? (val[2] / 8) : 20;
		},
		itemStyle: {
			normal: {
				color: color
			}
		},
		data: item[1]
	}, {
		name: item[0] + ' Top10',
		type: 'effectScatter',
		coordinateSystem: 'geo',
		zlevel: 2,
		rippleEffect: {
			scale: 2,
			brushType: 'stroke'
		},
		label: {
			normal: {
				show: true,
				position: 'right',
				formatter: '{b}'
			}
		},
		symbolSize: function(val) {
			return val[2] < 160 ? (val[2] / 8) : 20;
		},
		itemStyle: {
			normal: {
				color: '#135aaa'
			}
		},
		data: item[1].map(function(dataItem) {
			return {
				name: dataItem[1].name,
				value: dataItem[1].coord
			};
		})
	}, {
		name: item[0] + ' Top10',
		type: 'effectScatter',
		coordinateSystem: 'geo',
		zlevel: 2,
		rippleEffect: {
			scale: 2,
			brushType: 'stroke'
		},
		label: {
			normal: {
				show: true,
				position: 'right',
				formatter: '{b}'
			}
		},
		symbolSize: function(val) {
			return 10;
		},
		itemStyle: {
			normal: {
				color: '#135aaa'
			}
		},
		data: item[1].map(function(dataItem) {
			return {
				name: dataItem[0].name,
				value: dataItem[0].coord
			};
		})
	});

	option = {
		backgroundColor: '#7c7e81',
		title: {

			text: '',
			left: 'center',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'item', //'{b}<br /> 供货量 ：  {c} <br /> 日期 ： 2016-06-07'
			formatter: function(param) {
				if(param.value.length == 2) {
					//发货商
					return param.name;
				} else {
					return param.name + '<br />  供货量 ：' + parseInt(param.value[2]);
				}
			}
		},
		geo: {
			map: 'china',
			label: {
				emphasis: {
					show: false
				}
			},
			roam: true,
			itemStyle: {
				normal: {
					areaColor: '#f5fbfd',
					borderColor: '#e0eff3',
					borderWidth: 2
				},
				emphasis: {
					areaColor: '#f5fbfd',
					borderColor: '#e0eff3',
					borderWidth: 2
				}
			}
		},
		series: series
	};
	var myChart = echarts.init(document.getElementById('chinaMapWrapper'));
	myChart.setOption(option);

	/*图表数据绑定*/
	var chartData = data.charts.producerDrugs;
	for(var i = 0; i < chartData.length; i++) {
		$("#svgStatistics1 .top").html($("#svgStatistics1 .top").html() + "<span>" + chartData[i].category + "</span>");
	}
	if(chartData.length > 0) {
		for(var i = 0; i < chartData[0].data.length; i++) {
			$("#svgStatistics1 .btm").html($("#svgStatistics1 .btm").html() + "<span>" + chartData[0].data[i] + "</span>");
		}
	}

	$("#svgStatistics1 .top span:first-child").addClass("active");
	initDataC($("#svgStatistics1 .top span:first-child").text(), 'fcName');

	$('.drug_search .top span').on('click', function() {
		var index = $(this).index();
		var keyword = $(this).text();
		$("#svgStatistics1 .btm").html("");
		for(var i = 0; i < chartData[index].data.length; i++) {
			$("#svgStatistics1 .btm").html($("#svgStatistics1 .btm").html() + "<span>" + chartData[index].data[i] + "</span>");
		}
		initDataC(keyword, 'fcName');
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.drug_search .btm').on('click', "span", function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.drug_sale .svgStatistics').css({
			visibility: 'visible'
		});
		var index = $(this).index();
		var keyword = $(this).text();
		initDataC(keyword, 'ethName');
	});
	$('.loadings').hide();

	var timeS, timeE, timeB, clientX1, clientY1, clientX2, clientY2;
	myChart.on('mousedown', function() {
		clientX1 = event.clientX;
		clientY1 = event.clientY;
		timeS = (new Date()).getTime();

	});
	myChart.on('mouseup', function(params) {
		clientX2 = event.clientX;
		clientY2 = event.clientY;
		timeE = (new Date()).getTime();
		timeB = timeE - timeS;
		if(timeB < 200 && clientX1 == clientX2) {
			var trueName;
			for(name in provinceJson) {
				if(name == params.name) {
					trueName = provinceJson[name];
					break;
				}
			}
			initProvinceEcharts(trueName, params.name);
		}
	});
});

function initDataC(names, methodName) {
	$.get(BASEURL + 'entController/queryEthTypeSaleByFcnameOrEthid?' + methodName + '=' + names, function(data) {
		var datas = {
			"name": [],
			"number": []
		};
		for(var i = 0; i < data.data.length; i++) {
			datas.name.push(data.data[i].producerName);
			datas.number.push(data.data[i].drugNumber);
		}
		datas.name.reverse();
		datas.number.reverse();
		initChart(datas);
	});
}