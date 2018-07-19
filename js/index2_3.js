var geoCoordMap = {
	'上海强生有限公司': [121.4648, 31.2891],
	'新疆奇康哈博维药股份有限公司': [87.9236, 43.5883],
	'南宁市迪智药业有限责任公司': [108.479, 23.1152],
	'江西南昌桑海制药厂': [116.0046, 28.6633],
	'大连美罗大药厂': [122.2229, 39.4409],
	'广州康本医药有限公司': [113.5107, 23.2196],
	'西藏诺迪康药业股份有限公司': [91.1865, 30.1465],
	'长春市华光气体厂': [125.8154, 44.2584]
};

var CQData = [
	[{
		name: '上海强生有限公司'
	}, {
		name: '上海强生有限公司',
		value: 95
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '新疆奇康哈博维药股份有限公司',
		value: 90
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '南宁市迪智药业有限责任公司',
		value: 80
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '江西南昌桑海制药厂',
		value: 70
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '大连美罗大药厂',
		value: 60
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '广州康本医药有限公司',
		value: 50
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '西藏诺迪康药业股份有限公司',
		value: 40
	}],
	[{
		name: '上海强生有限公司'
	}, {
		name: '长春市华光气体厂',
		value: 30
	}]
];

var planePath = 'path://M408.467,456.287v15.025h-12v-6h-69v-112h19v-23.705l22-9.295l11.766-22h18.51c0.62-1.743,2.269-3,4.225-3h1c2.485,0,4.5,2.016,4.5,4.5v15.525c9.983,0.268,18,8.426,18,18.475s-8.017,18.207-18,18.475v27.051c9.983,0.268,18,8.426,18,18.475s-8.017,18.207-18,18.475v3.051c9.983,0.268,18,8.425,18,18.474S418.45,456.019,408.467,456.287L408.467,456.287z';

var convertData = function(data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		var dataItem = data[i];
		var fromCoord = geoCoordMap[dataItem[0].name];
		var toCoord = geoCoordMap[dataItem[1].name];
		if (fromCoord && toCoord) {
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
//[
var item = ['重庆', CQData]
	//].forEach(function(item, i) {
series.push({
	name: item[0] + ' Top10',
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
	data: convertData(item[1])
}, {
	name: item[0] + ' Top10',
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
	data: convertData(item[1])
}, {
	name: item[0] + ' Top10',
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
		return val[2] / 8;
	},
	itemStyle: {
		normal: {
			color: color
		}
	},
	data: item[1].map(function(dataItem) {
		return {
			name: dataItem[1].name,
			value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
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
		return val[2] / 8;
	},
	itemStyle: {
		normal: {
			color: '#135aaa'
		}
	},
	data: item[1].map(function(dataItem) {
		return {
			//				name: dataItem[0].name,
			value: geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
		};
	})
});
//});

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
		formatter: '{b}<br /> 供货量 ：  {c} <br /> 日期 ： 2016-06-07'
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
window.onresize = myChart.resize;