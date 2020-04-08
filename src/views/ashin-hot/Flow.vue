<template>
  <div class="container">

    <div id="container" style="height:800px;margin-top: 20px;"></div>

  </div>
</template>

<script>
import ashin from '@/models/ashin'

export default {
  components: {
    // LinTable,
    // BookEdit,
  },
  data() {
    return {
      datas:[],
      form:{}
    }
  },
  async created() {
    //this.drawLine();


  },
  async mounted(){
    await this.getData({});
    this.drawLine();
    console.log("画出来")
  },
  methods: {
    async getData() {
      try {
        const res = await ashin.getFlow()
        this.datas = res

      } catch (error) {
        if (error.code === 10020) {
          this.datas = []
        }
      }


    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例

      let myChart = this.$echarts.init(document.getElementById('container'))
      //let echarts = this.$echarts;
      // 绘制图表
      require('echarts/extension/bmap/bmap');
      var data = this.datas;
      var option = null;

      var flowarray=[];
      var container = [];
      data.map(function(item,idx){
        var itemarr = [];
        itemarr.push(item.lng,item.lat,item.count);
        flowarray.push(itemarr);
      });

      console.log(flowarray)
      option = {
        // backgroundColor: '#404a59',

        title: {
          text: '主要地区人流量',
         // subtext: 'data from PM25.in',
         // sublink: 'http://www.pm25.in',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter : function(params){
            console.log(params);//打印params
            return  "人流量："+params.value[2]+"人";
          }
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data:['人流量'],
          textStyle: {
            color: 'red'
          }
        },
        visualMap: {
          min: 0,
          max: 60,
          splitNumber: 10,
          color: ['#d94e5d','#eac736','#50a3ba'],
          textStyle: {
            color: '#fff'
          }
        },
        bmap: {
          center: [123.38,41.813],
          zoom: 11,
          roam: true,
          mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': "green"
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
        },
        series: [
          {
            name: '人流量',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: flowarray,
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      }
      // 添加百度地图插件

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    }

  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
