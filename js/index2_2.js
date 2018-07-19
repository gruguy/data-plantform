var geoCoordMap = {
	'强生有限公司': [121.4648, 31.2891]
};

var data = [{
	name: '强生有限公司',
	value: 90
}];

var convertData = function(data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		res.push({
			name: data[i].CNAME,
			value: [data[i].LONGITUDE, data[i].LATITUDE, 10]
		});
	}
	return res;
};

var color = '#0077ff';
var series = [];
$.get(BASEURL + 'entController/queryOperaterMapData?entId=' + sessionStorage.getItem("entId"), function(data) {
	series.push({
		name: '经营性企业',
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
			return val[2];
		},
		itemStyle: {
			normal: {
				color: color
			}
		},
		data: convertData(data.data)
	});
	//地图配置数据
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
			trigger: 'item',
			formatter: '{b}'
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
	$(".loadings").hide();

	//图表数据
	// 1.近一年企业销货

	var myChart1 = echarts.init(document.getElementById('svgStatistics1'));
	myChart1.showLoading(opt);
	var option1 = {
		title: {
			text: '近一年企业销货',
			left: 'center',
			top: 20,
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			axisLabel: {
				formatter: '{value}',
				show: true,
				textStyle: {
					color: '#fff'
				}
			},
			type: 'category',
			boundaryGap: false,
			data: data.charts.storeAndSale[0].times
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value}',
				show: true,
				textStyle: {
					color: '#fff'
				}
			}
		},
		series: [{
			name: '销货',
			type: 'line',
			data: data.charts.storeAndSale[0].data,
			markPoint: {
				data: [{
					type: 'max',
					name: '最大值'
				}, {
					type: 'min',
					name: '最小值'
				}]
			}
		}]
	};

	myChart1.setOption(option1);
	myChart1.hideLoading();
	//近一年出货占比
	var myChart2 = echarts.init(document.getElementById('svgStatistics2'));
	myChart2.showLoading(opt);
	var option2 = {
		title: {
			text: '近一年企业出货占比',
			left: 'center',
			top: 20,
			textStyle: {
				color: '#fff'
			}
		},

		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)",
			textStyle: {
				fontSize: 12
			}
		},
		series: [{
			name: '出货量',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: convertDataArr(data.charts.saleCategory),
			label: {
				normal: {
					formatter: "{b} \n {d}%",
					textStyle: {
						color: '#fff'
					}
				}
			},
			labelLine: {
				normal: {
					lineStyle: {
						color: '#fff'
					},
					smooth: 0.2,
					length: 10,
					length2: 20
				}
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	myChart2.setOption(option2);
	myChart2.hideLoading();
});

function convertDataArr(data){
	var arr = [];
	for(var i=0;i<data.length;i++){
		arr.push({
			name:data[i].drugName,
			value:data[i].drugNumber
		})
	}
	return arr;
}
