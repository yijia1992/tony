<template>
  <div class="container">
<!--    <el-card class="box-card">-->
<!--      <el-date-picker-->
<!--            v-model="form.start_time"-->
<!--            type="datetime"-->
<!--            placeholder="选择开始时间">-->
<!--    </el-date-picker>-->
<!--      <el-date-picker-->
<!--              style="margin-left: 20px"-->
<!--              v-model="form.end_time"-->
<!--              type="datetime"-->
<!--              placeholder="选择结束时间">-->
<!--      </el-date-picker>-->
<!--      <el-button type="primary" @click="submitTime()">保 存</el-button>-->
<!--    </el-card>-->
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
    await this.getData();
    this.drawLine();
    console.log("画出来")
  },
  methods: {
    async getData() {
      try {
        const res = await ashin.getWorkHome()
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


      var homearray=[];
      data.homes.map(function(item,idx){
        var obj = {};
        obj.name = item.imsi;
        var arr = [];
        arr.push(item.lng,item.lat,item.dur_minute+"分钟");
        obj.value = arr;
        homearray.push(obj);
      })

        var workarray=[];
        data.works.map(function(item,idx){
            var obj = {};
            obj.name = item.imsi;
            var arr = [];
            arr.push(item.lng,item.lat,item.dur_minute+"分钟");
            obj.value = arr;
            workarray.push(obj);
        })


      // var points = [].concat.apply(
      //         [],
      //         data.map(function(track) {
      //           return track.map(function(seg) {
      //             return seg.coord.concat([1]);
      //           });
      //         })
      // );
      option = {
        title: {
          text: '职住点分析',
          subtext: '驻点和驻留时间',
          left: 'center'
        },
        tooltip : {
          trigger: 'item'
        },
        bmap: {
          center: [123.38,41.813],
          zoom: 10,
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
        series : [
          {
            name: '居住点',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: homearray,
            label: {
              formatter: '{c}',
              position: 'right',
              show: false
            },
            itemStyle: {
              color: 'orange'
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
            {
                name: '职业点',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: workarray,
                label: {
                    formatter: '{c}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: 'green'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },

    async submitTime(){
      console.log(this.form);
      await this.getData(this.form);
      this.drawLine();
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
