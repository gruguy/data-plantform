var myChart1 = echarts.init(document.getElementById('svgStatistics1'));
var myChart2 = echarts.init(document.getElementById('svgStatistics2'));
var myChart3 = echarts.init(document.getElementById('svgStatistics3'));
var myChart4 = echarts.init(document.getElementById('svgStatistics4'));

myChart1.showLoading(opt);
myChart2.showLoading(opt);
myChart3.showLoading(opt);
myChart4.showLoading(opt);
var option1 = {
	title: {
		text: '该药品销售逐年统计',
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
		data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']
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
		data: [1100, 1150, 2505, 3000, 3500, 3560, 4000, 2000, 4010, 2000, 3500, 500],
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
var option2 = {
	title: {
		text: '该药品生产企业市场占比',
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
		name: '生产企业占比',
		type: 'pie',
		radius: '55%',
		center: ['50%', '50%'],
		data: [{
			value: 335,
			name: '哈药六厂'
		}, {
			value: 310,
			name: '武汉只要'
		}, {
			value: 274,
			name: '西安杨森'
		}, {
			value: 235,
			name: '蓝天里壁纸'
		}, {
			value: 400,
			name: '其他类'
		}].sort(function(a, b) {
			return a.value - b.value
		}),
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
			normal: {
				shadowBlur: 200,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};
var option3 = {
	title: {
		text: '该药品区域销量统计',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#fff'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		splitLine: {
			show: false
		},
		boundaryGap: [0, 0.1],
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff'
			}
		}
	},
	yAxis: {
		type: 'category',
		splitLine: {
			show: false
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff'
			}
		},
		data: ['上海', '北京', '广州', '杭州', '陕西']
	},
	series: [{
		name: 'Top 5',
		type: 'bar',
		barWidth: '15',
		data: [1600, 2600, 3100, 3700, 4700],
		label: {
			normal: {
				textStyle: {
					color: '#fff'
				}
			}
		}
	}]
};
var option4 = {
	title: {
		text: '增涨最快区域排名',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#fff'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		splitLine: {
			show: false
		},
		boundaryGap: [0, 0.1],
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff'
			}
		}
	},
	yAxis: {
		type: 'category',
		splitLine: {
			show: false
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff'
			}
		},
		data: ['北京兴事堂药店', '自贡市高新区大药房', '漯河市大河药房', '重庆桐君阁大药房', '万鑫药房优显店']
	},
	series: [{
		name: '销量',
		type: 'bar',
		barWidth: '15',
		data: [1600, 2600, 3100, 3700, 4700],
		label: {
			normal: {
				textStyle: {
					color: '#fff'
				}
			}
		}
	}]
};

function initChart(data) {
	//	$.get(BASEURL + "productController/queryProductMapData?ethName=" + localStorage.getItem("keywords"), function(data) {
	option1.series[0].data = convertData_2(data.charts.drugSaleYear);
	myChart1.setOption(option1);
	myChart1.hideLoading();

	option2.series[0].data = convertData_2(data.charts.producer);
	myChart2.setOption(option2);
	myChart2.hideLoading();

	option3.yAxis.data = convertDataX_2(data.charts.areaSaleTop5);
	option3.series[0].data = convertDataY_2(data.charts.areaSaleTop5);
	myChart3.setOption(option3);
	myChart3.hideLoading();


	option4.yAxis.data = convertDataX_2(data.charts.fastestGrowth);
	option4.series[0].data = convertData_2(data.charts.fastestGrowth);
	myChart4.setOption(option4);
	myChart4.hideLoading();
	//	});
}

function cityChart(provinceCode) {
	$.get(BASEURL + 'productController/productMapDataByProvince?ethName=' + localStorage.getItem("keywords") + '&provinceCode=' + provinceCode, function(data) {

		option1.series[0].data = convertData_2(data.drugSaleYear);
		myChart1.setOption(option1);

		option2.series[0].data = convertData_2(data.producer);
		myChart2.setOption(option2);

		option3.yAxis.data = convertDataX_2(data.areaSaleTop5);
		option3.series[0].data = convertDataY_2(data.areaSaleTop5);
		myChart3.setOption(option3);

		option4.yAxis.data = convertDataX_2(data.fastestGrowth);
		option4.series[0].data = convertData_2(data.fastestGrowth);
		myChart4.setOption(option4);
	});
}