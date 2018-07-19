function main(){
var lChart1 = echarts.init(document.getElementById('lChart1'));
lChart1.showLoading(opt);
$.get(BASEURL + 'mainController/queryXiaoShouLiangByYear', function(datas) {
	console.log('1'+datas);
	var option1 = {
		tooltip: {
			trigger: 'axis',
			formatter: function(param) {
				var group = '';
				group = param[0].name + '年<br />' + param[0].seriesName + ':' + (param[0].value) + '<br />' + param[1].seriesName + ':' + parseFloat(param[1].value).toFixed(2) + '%';
				return group;
			}
		},
		grid: {
			top: '20px',
			left: '50px'
		},
		legend: {
			bottom: '0',
			left: 'center',
			textStyle: {
				color: '#b8becc'
			},
			data: datas.name
		},
		xAxis: [{
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				}
			},
			type: 'category',
			data: convertChartDataX(datas.value)
		}],
		yAxis: [{
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}

			},
			splitLine: {
				show: false,
			},
			type: 'value',
			name: '',
			min: 0,
			axisLabel: {
				formatter: function(param){
					return parseInt(param/10000);
				},
				textStyle: {
					color: '#b8becc'
				}
			}
		}, {
			show: false,
			type: 'value',
			name: '数量',
			min: 0
		}],
		series: [{
			axisLine: {
				lineStyle: {
					color: '#f00'
				}
			},
			name: '销售规模',
			type: 'bar',
			barCategoryGap: '50%',
			itemStyle: {
				normal: {
					color: '#d94425'
				}
			},
			data: convertChartData(datas.value, 0)
		}, {
			name: '增长率',
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			label: {
				normal: {
					show: true,
					formatter: function(param) {
						return param.value + '%';
					},
					textStyle: {
						color: '#b8becc'
					}
				}
			},
			itemStyle: {
				normal: {
					color: '#2a89c0'
				}
			},
			yAxisIndex: 1,
			data: convertChartData(datas.value, 1)
		}]
	};
	lChart1.setOption(option1);
	lChart1.hideLoading();
});

function convertChartDataX(data) {
	var arr = [];
	for(i in data) {
		arr.push(i);
	}
	return arr;
}

function convertChartData(data, index) {
	var arr = [];
	for(i in data) {
		arr.push(data[i][index]);
	}
	return arr;
}

var lChart2 = echarts.init(document.getElementById('lChart2'));
lChart2.showLoading(opt);
$.get(BASEURL + 'mainController/queryGouMaiRenShuByMonth', function(datas) {
	console.log('2'+datas);
	var option2 = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			top: '20px'
		},
		legend: {
			bottom: '0',
			left: 'center',
			textStyle: {
				color: '#b8becc'
			},
			data: datas.name
		},
		xAxis: {
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				}
			},
			type: 'category',
			boundaryGap: false,
			data: convertChartDataX(datas.value)
		},
		yAxis: {
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			min: 0,
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				},
				formatter: function(param){
					return parseInt(param/10000);
				}
			}
		},
		series: [{
			name: datas.name[0],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: '#d94425'
				}
			},
			data: convertChartData(datas.value, 0)
		}, {
			name: datas.name[1],
			type: 'line',
			symbol: 'diamond',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: '#2a89c0'
				}
			},
			data: convertChartData(datas.value, 1)
		}]
	};

	lChart2.setOption(option2);
	lChart2.hideLoading();
});

var lChart3 = echarts.init(document.getElementById('lChart3'));
lChart3.showLoading(opt);
$.get(BASEURL + 'mainController/queryLiexingByMonth', function(datas) {
	console.log('3'+datas);
	var option3 = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			top: '20px',
			bottom: '100px'
		},
		legend: {
			bottom: '0px',
			left: 'center',
			textStyle: {
				color: '#b8becc',
				fontSize: '10'
			},
			data: datas.name
		},
		xAxis: {
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				}
			},
			type: 'category',
			boundaryGap: false,
			data: datas.value.month
		},
		yAxis: {
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			min: 0,
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				},
				formatter: function(param){
					return parseInt(param/10000);
				}
			}
		},
		series: [{
			name: datas.name[0],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: '#d94425'
				}
			},
			data: datas.value.data[0]
		}, {
			name: datas.name[1],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: '#eb9601'
				}
			},
			data: datas.value.data[1]
		}, {
			name: datas.name[2],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[2]
		}, {
			name: datas.name[3],
			type: 'line',
			symbol: 'rect',
			itemStyle: {
				normal: {
					color: '#2a89c0'
				}
			},
			symbolSize: 5,
			data: datas.value.data[3]
		}, {
			name: datas.name[4],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[4]
		}, {
			name: datas.name[5],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[5]
		}, {
			name: datas.name[6],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[6]
		}, {
			name: datas.name[7],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[7]
		}, {
			name: datas.name[8],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[8]
		}, {
			name: datas.name[9],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[9]
		}, {
			name: datas.name[10],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[10]
		}, {
			name: datas.name[11],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[11]
		}, {
			name: datas.name[12],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[12]
		}, {
			name: datas.name[13],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[13]
		}, {
			name: datas.name[14],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.value.data[14]
		}]
	};

	lChart3.setOption(option3);
	lChart3.hideLoading();
});

var cChart1 = echarts.init(document.getElementById('cChart1'));
cChart1.showLoading(opt);
$.get(BASEURL + 'mainController/queryTwoYearSale', function(datas) {
	console.log('4'+datas);
	var option4 = {
		title: {
			text: '品类销售占比的时间趋势变化',
			textAlign: 'center',
			left: 'middle',
			bottom: 10,
			textStyle: {
				color: '#b8becc',
				fontSize: 16,
				fontWeight: 'normal'
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(param) {
				var group = '';
				for(var i = 0; i < datas.name.length; i++) {
					group += param[i].seriesName + ':' + parseFloat(param[i].value).toFixed(2) + '%<br />';
				}
				return group;
			}
		},
		color: ['#d94425', '#00ba00', '#2a89c0', '#740875', '#eb9601'],
		legend: {
			orient: 'vertical',
			right: 20,
			top: 14,
			textStyle: {
				color: '#b8becc',
				fontSize: '10'
			},
			itemWidth: 12,
			itemHeight: 12,
			data: datas.name
		},
		grid: {
			top: '5%',
			left: '3%',
			right: '44%',
			bottom: '18%',
			containLabel: true
		},
		xAxis: [{

			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				}
			},
			type: 'category',
			data: datas.value.year
		}],
		yAxis: [{
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},

			min: 0,
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				},
				formatter: function(param) {
					return param  + '%';
				}
			},
			type: 'value'
		}],
		series: series(datas)
	};
	cChart1.setOption(option4);
	cChart1.hideLoading();
});

function series(data) {
	var arr = [];
	for(var i = 0; i < data.value.data.length; i++) {
		arr.push({
			name: data.name[i],
			type: 'bar',
			stack: '品类销售占比',
			data: data.value.data[i]

		});
	}
	return arr;
}

function seriesNormal(data) {
	var arr = [];
	for(var i = 0; i < data.value.length; i++) {
		arr.push({
			name: data.name[i],
			value: data.value[i]
		});
	}
	return arr;
}

function seriesNormal1(data) {
	var arr = [];
	for(var i = 0; i < data.value.category.length; i++) {
		arr.push({
			name: data.name[i],
			value: data.value[i]
		});
	}
	return arr;
}

var cChart2 = echarts.init(document.getElementById('cChart2'));
cChart2.showLoading(opt);
$.get(BASEURL + 'mainController/queryAllYearSale', function(datas) {
	console.log('5'+datas);
	var option5 = {
		title: {
			text: '品类销售额占比',
			x: 'center',
			bottom: 10,
			textStyle: {
				color: '#b8becc',
				fontSize: 16,
				fontWeight: 'normal'
			}
		},
		label: {
			normal: {
				textStyle: {
					color: '#b8becc'
				}
			}
		},
		labelLine: {
			normal: {
				lineStyle: {
					color: '#b8becc'
				}
			}
		},
		color: ['#eb9601', '#00ba00', '#2a89c0', '#19398e', '#740875', '#d94425'],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			name: '销售占比',
			type: 'pie',
			label: {
				normal: {
					formatter: function(params) {
						var percent = params.percent.toFixed(1);
						return params.name + ' ' + percent + '%';
					},
					textStyle: {
						color: '#b8becc',
						fontSize: 8
					}
				}
			},

			labelLine: {
				normal: {
					length2: 1,
					lineStyle: {
						color: '#b8becc'
					}
				}
			},
			radius: '55%',
			center: ['50%', '40%'],
			data: seriesNormal(datas),

			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	cChart2.setOption(option5);
	cChart2.hideLoading();
});
var cChart3 = echarts.init(document.getElementById('cChart3'));
cChart3.showLoading(opt);
$.get(BASEURL + 'mainController/queryEthPrice', function(datas) {
	console.log('6'+datas);
	var option6 = {
		title: {
			text: '药品价格指数（本年）',
			x: 'center',
			bottom: 10,
			textStyle: {
				color: '#b8becc',
				fontSize: 16,
				fontWeight: 'normal'
			}
		},
		legend: {
			orient: 'vertical',
			right: 0,
			top: 14,
			textStyle: {
				color: '#b8becc',
				fontSize: '10'
			},
			itemWidth: 12,
			itemHeight: 12,
			data: datas.name
		},
		color: ['#eb9601', '#00ba00', '#2a89c0', '#19398e', '#740875', '#830ab6', '#d94425'],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			name: '价格指数',
			type: 'pie',
			radius: '55%',
			center: ['40%', '40%'],
			label: {
				normal: {
					formatter: function(params) {
						var percent = params.percent.toFixed(0);
						return percent + '%';
					},
					textStyle: {
						color: '#b8becc'
					}
				}
			},
			labelLine: {
				normal: {
					length2: 1,
					lineStyle: {
						color: '#b8becc'
					}
				}
			},
			data: seriesNormal(datas),
			formatter: "{b} : {c} ({d}%)",
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	cChart3.setOption(option6);
	cChart3.hideLoading();
});

var cbChart1 = echarts.init(document.getElementById('cbChartChart1'));
cbChart1.showLoading(opt);
$.get(BASEURL + 'mainController/queryProfitByEthType', function(datas) {
	console.log('7'+datas);
	var schema = [{
		name: 'share',
		index: 0,
		text: '份额'
	}, {
		name: 'profit',
		index: 1,
		text: '利润'
	}, {
		name: 'price',
		index: 1,
		text: '平均售价'
	}];
	var option7 = {
		title: {
			text: '份额毛利分析',
			textStyle: {
				color: '#fff',
				fontWeight: 'normal',

			}
		},
		tooltip: {
			padding: 10,
			backgroundColor: '#222',
			borderColor: '#777',
			borderWidth: 1,
			formatter: function(obj) {
				var value = obj.value;
				return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
					value[3] +
					'</div>' +
					schema[0].text + '：' + value[1] + '<br>' +
					schema[1].text + '：' + value[0] + '<br>' +
					schema[2].text + '：' + value[2]
			}
		},
		xAxis: {
			show: false,
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			}
		},
		yAxis: {
			show: false,
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			},
			scale: true
		},
		series: {
			data: datas.value,
			type: 'scatter',
			symbolSize: function(data) {
				return data[2] / 10 > 30 ? 30 : 10;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function(param) {
						return param.data[3];
					},
					position: 'top'
				}
			},
			itemStyle: {
				normal: {
					color: '#d94425'
				}
			}
		}
	};

	cbChart1.setOption(option7);
	cbChart1.hideLoading();
});

var cbChart2 = echarts.init(document.getElementById('cbChart2'));
cbChart2.showLoading(opt);
$.get(BASEURL + 'mainController/queryDrugClassifyBy12Month', function(datas) {
	console.log('7'+datas);
	var option8 = {
		title: {
			text: '药品市场占比',
			x: 'center',
			top: 10,
			textStyle: {
				color: '#b8becc',
				fontSize: 16,
				fontWeight: 'normal'
			}
		},
		legend: {
			orient: 'vertical',
			right: 0,
			top: 70,
			textStyle: {
				color: '#b8becc',
				fontSize: '10'
			},
			itemWidth: 12,
			itemHeight: 12,
			data: datas.name
		},
		color: ['#00ba00', '#d94425', '#eb9601'],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			name: '价格指数',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			label: {
				normal: {
					formatter: function(params) {
						var percent = params.percent.toFixed(0);
						return percent + '%';
					},
					textStyle: {
						color: '#b8becc'
					}
				}
			},
			labelLine: {
				normal: {
					length2: 1,
					lineStyle: {
						color: '#b8becc'
					}
				}
			},
			data: [{
				value: datas.value[0],
				name: datas.name[0]
			}, {
				value: datas.value[1],
				name: datas.name[1]
			}, {
				value: datas.value[2],
				name: datas.name[2]
			}],
			formatter: "{b} : {c} ({d}%)",
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	cbChart2.setOption(option8);
	cbChart2.hideLoading();
});

var rbChart1 = echarts.init(document.getElementById('rChart1'));
rbChart1.showLoading(opt);
$.get(BASEURL + 'mainController/queryTwoYearSaleProportion', function(datas) {
	console.log('8'+datas);
	var option9 = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			top: 30,
			bottom: 120
		},
		legend: {
			textStyle: {
				color: '#b8becc'
			},
			bottom: 0,
			data: datas.name
		},
		xAxis: [{
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			axisLabel: {
				formatter: function(val) {
					return val.split("").join("\n");
				}
			},
			type: 'category',
			data: datas.value.category
		}],
		yAxis: [{
			splitLine: {
				show: false,
			},

			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			type: 'value',
			name: '占比 ',
			min: 0,
			axisLabel: {
				show: false
			}
		}, {
			show: false,
			type: 'value',
			name: '平均值 ',
			min: 0,
		}],
		series: [{
			name: datas.name[0],
			type: 'bar',
			itemStyle: {
				normal: {
					color: '#d94425'
				}
			},
			data: datas.data[0]
		}, {
			name: datas.name[1],
			type: 'bar',
			itemStyle: {
				normal: {
					color: '#2a89c0'
				}
			},
			data: datas.data[1]
		}, {
			name: datas.name[2],
			type: 'line',
			yAxisIndex: 1,
			symbol: 'circle',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: '#eb9601'
				}
			},
			label: {
				normal: {
					show: true,
					formatter: function(param) {
						return parseInt(param.value) + '%';
					},
					textStyle: {
						color: '#b8becc'
					}
				}
			},
			data: datas.data[2]
		}]
	};
	rbChart1.setOption(option9);
	rbChart1.hideLoading();
});

var rbChart2 = echarts.init(document.getElementById('rChart2'));
rbChart2.showLoading(opt);
$.get(BASEURL + 'mainController/queryTwoYearPriceProportion', function(datas) {
	console.log('9'+datas);
	var option10 = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			},

		},
		legend: {
			bottom: 10,
			itemWidth: 12,
			itemHeight: 12,
			textStyle: {
				color: '#b8becc'
			},
			data: datas.name
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: 50,
			top: 20,
			containLabel: true
		},
		xAxis: {
			type: 'value',
			show: false
		},
		yAxis: {
			axisLabel: {
				textStyle: {
					color: '#b8becc'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false,
			},
			type: 'category',
			data: datas.value.category
		},

		series: [{
			name: datas.name[0],
			type: 'bar',
			barCategoryGap: '50%',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#737780'
				}
			},
			data: datas.data[0]
		}, {
			name: datas.name[1],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#eb9601'
				}
			},
			data: datas.data[1]
		}, {
			name: datas.name[2],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#d94425'
				}
			},
			data: datas.data[2]
		}, {
			name: datas.name[3],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#00ba00'
				}
			},
			data: datas.data[3]
		}, {
			name: datas.name[4],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#2a89c0'
				}
			},
			data: datas.data[4]
		}, {
			name: datas.name[5],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#19398e'
				}
			},
			data: datas.data[5]
		}, {
			name: datas.name[6],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#830ab6'
				}
			},
			data: datas.data[6]
		}, {
			name: datas.name[7],
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					color: '#740875'
				}
			},
			data: datas.data[7]
		}]
	};

	rbChart2.setOption(option10);
	rbChart2.hideLoading();
});

var rbChart3 = echarts.init(document.getElementById('rChart3'));
rbChart3.showLoading(opt);
$.get(BASEURL + 'mainController/queryOneYearSaleProportion', function(datas) {
	console.log('10'+datas);
	var option11 = {
		tooltip: {
			trigger: 'axis',
			formatter: function(param) {
				var group = '';
				for(var i = 0; i < param.length; i++) {
					group += param[i].seriesName + ':' + parseFloat(param[i].value).toFixed(2) + '%<br />';
				}
				return group;
			}
		},
		grid: {
			top: '20px'
		},
		legend: {
			bottom: '0',
			left: 'center',
			textStyle: {
				color: '#b8becc'
			},
			data: datas.value.category
		},
		xAxis: {
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				}
			},
			type: 'category',
			boundaryGap: false,
			data: datas.name
		},
		yAxis: {
			splitLine: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#b8becc'
				}
			},
			min: 0,
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#b8becc',
					fontSize: '12px'
				},
				formatter: function(param) {
					return param + '%';
				}
			}
		},
		series: [{
			name: datas.value.category[0],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.data[0],
		}, {
			name: datas.value.category[1],
			type: 'line',
			symbol: 'rect',
			symbolSize: 5,
			data: datas.data[1]
		}, {
			name: datas.value.category[2],
			type: 'line',
			symbol: 'triangle',
			symbolSize: 5,
			data: datas.data[2]
		}, {
			name: datas.value.category[3],
			type: 'line',
			symbol: 'triangle',
			symbolSize: 5,
			data: datas.data[3]
		}]
	};

	rbChart3.setOption(option11);
	rbChart3.hideLoading();
});
}

window.onresize = function(){
	location.reload();
}
