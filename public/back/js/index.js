$(function(){
  //柱状图与饼状图

  //柱状图
  // 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init(document.querySelector(".echarts-l"));

  // 指定图表的配置项和数据
  var option1 = {
      title: {
          text: '2017年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [500, 1000,1300, 1100, 1400, 800]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);


  //饼状图
  var myChart2 = echarts.init(document.querySelector(".echarts-r"));
  option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018.8.19',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['艾迪达斯','耐克','三叶草','红蜻蜓','森马']
    },
    series : [
        {
            name: '热门品牌销售',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'艾迪达斯'},
                {value:310, name:'耐克'},
                {value:234, name:'三叶草'},
                {value:135, name:'红蜻蜓'},
                {value:1548, name:'森马'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);

})