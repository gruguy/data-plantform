function initChart(data) {
	var myChart = echarts.init(document.getElementById('svgStatistics3'));
	myChart.showLoading(opt);
	var option1 = {
		title: {
			text: '药品销售统计',
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
				inside: false,
				textStyle: {
					color: '#fff'
				}
			},
			data: data.name
		},
		series: [{
			name: 'Top 5',
			type: 'bar',
			barWidth: '15',
			data: data.number,
			label: {
				normal: {
					textStyle: {
						color: '#fff'
					}
				}
			}
		}]
	};
	var myChart = echarts.init(document.getElementById('svgStatistics3'));
	myChart.setOption(option1);
	myChart.hideLoading();
}