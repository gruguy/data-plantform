var convertData = function(data) {
	var res = [];
	for(var i = 0; i < data.length; i++) {
		res.push({
			name: data[i].entName,
			value: [data[i].lng, data[i].lat, data[i].entId, data[i].entType, data[i].entTypeName] //lng,lat,entId,entType,entTypeName
		});
	}
	return res;
};
var color = '#0077ff';
var series = [];
$.get(BASEURL + "entController/queryEntMapData?entName=" + localStorage.getItem("keywords"), function(data) {
	/*绑定左侧生产企业和经营企业*/
	var producerArr = [],
		salerArr = [],
		producerTxt = '',
		salerTxt = '';
	for(var i = 0; i < data.data.length; i++) { //生产企业
		if(data.data[i].entType == 1) {
			producerArr.push({
				entId: data.data[i].entId,
				name: data.data[i].entName
			});
		}
		if(data.data[i].entType == 4) { //经营企业
			salerArr.push({
				entId: data.data[i].entId,
				name: data.data[i].entName
			});
		}
	}
	if(producerArr) {
		$.each(producerArr, function(i, ele) {
			producerTxt += '<li><h5><a data-entid=' + producerArr[i].entId + ' data-href="index2_1.html">' + ele.name + '</a></h5></li>';
		});
	}else{
		producerTxt = '<li><h5>暂无数据！</h5></li>';
	}
	if(salerArr) {
		$.each(salerArr, function(i, ele) {
			salerTxt += '<li><h5><a data-entid=' + salerArr[i].entId + ' data-href="index2_2.html">' + ele.name + '</a></h5></li>';
		});
	}else{
		salerTxt = '<li><h5>暂无数据！</h5></li>';
	}
	$(producerTxt).appendTo($('.producer ul'));
	$(salerTxt).appendTo($('.saler ul'));
	$('.listShow').on('click', 'a', function() {
		sessionStorage.setItem('entId',$(this).data('entid'));
		location.href=$(this).data('href');
	});
	series.push({
		name: ' Top10',
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
			return 10;
		},
		itemStyle: {
			normal: {
				color: color
			}
		},
		data: convertData(data.data)
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
			sessionStorage.setItem("entId", params.value[2]);
			if(params.value[3] == 1) {
				window.location.href = "index2_1.html";
			} else if(params.value[3] == 4) {
				window.location.href = "index2_2.html";
			}
		}
	});
});
//[
//var item = ['重庆', CQData]
//].forEach(function(item, i) {

//});