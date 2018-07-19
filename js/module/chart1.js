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
		text: '药品功能分类占比统计',
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
		name: '类型统计',
		type: 'pie',
		radius: '55%',
		center: ['50%', '50%'],
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
				length: 0,
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
var option2 = {
	title: {
		text: '药品销量（批）统计',
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
		}
		//		data: ['阿莫西林', '诺佛沙星胶囊', '头孢氨苄', '吗丁啉', '汇源肾宝']
	},
	series: [{
		name: '销量',
		type: 'bar',
		barWidth: '15',
		//		data: [1600, 2600, 3100, 3700, 4700],
		label: {
			normal: {
				textStyle: {
					color: '#fff'
				}
			}
		}
	}]
};
var option3 = option = {
	title: {
		text: '区域药品零售统计',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#fff'
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	calculable: true,
	grid: {
		left: '3%',
		right: '4%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff'
			}
		},
		data: ['浙江', '江苏', '北京', '山东', '陕西']
	}],
	yAxis: [{
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff'
			}
		},
		type: 'value'
	}],
	series: [{
		name: '药品销量',
		type: 'bar',
		textStyle: {
			color: '#fff'
		},
		data: [1600, 2600, 3100, 6500, 5300],

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
		text: '药品分类统计',
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
		name: '类型',
		type: 'pie',
		radius: '55%',
		center: ['50%', '60%'],
		data: [{
			value: 335,
			name: 'Otc 甲'
		}, {
			value: 310,
			name: 'otc乙'
		}, {
			value: 234,
			name: '处方药'
		}, {
			value: 135,
			name: '双轨（乙类非处方）'
		}],
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

var dataChart;

function initChart(data) {
	dataChart = data;
	option1.series[0].data = convertData(data.charts.drugFunction[0]);
	myChart1.setOption(option1);
	myChart1.hideLoading();

	option2.yAxis.data = convertDataX(data.charts.drugSaleTop5[0]);
	option2.series[0].data = convertDataY(data.charts.drugSaleTop5[0]);
	myChart2.setOption(option2);
	myChart2.hideLoading();

	option3.yAxis.data = convertDataX(data.charts.areaSaleTop5[0]);
	option3.series[0].data = convertDataY(data.charts.areaSaleTop5[0]);
	myChart3.setOption(option3);
	myChart3.hideLoading();

	option4.series[0].data = convertData(data.charts.drugClassify[0]);
	myChart4.setOption(option4);
	myChart4.hideLoading();
}

function cityChart(provinceCode) {
	$.get(BASEURL + 'homepageController/homeMapDataByProvince?provinceCode=' + provinceCode, function(data) {

		option1.series[0].data = convertData(data.drugFunction[0]);
		myChart1.setOption(option1);

		option2.yAxis.data = convertDataX(data.drugSaleTop5[0]);
		option2.series[0].data = convertDataY(data.drugSaleTop5[0]);
		myChart2.setOption(option2);

		option3.yAxis.data = convertDataX(data.charts.areaSaleTop5[0]);
		option3.series[0].data = convertDataY(data.areaSaleTop5[0]);
		myChart3.setOption(option3);

		option4.series[0].data = convertData(data.drugClassify[0]);
		myChart4.setOption(option4);
	});
}

$('.switchover .toggle').on('click', function() {
	if(!$(this).hasClass('slideUp')) {
		var provinceCode = localStorage.getItem('provinceCode');
		if(cityChartOn) {
			cityChart(provinceCode);
		} else {
			initChart(dataChart);
		}
	}
});