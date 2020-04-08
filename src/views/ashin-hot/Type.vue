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
    <div id="container" style="height:500px;margin-top: 20px;"></div>

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
        const res = await ashin.getType()
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
      var arr = [];
      arr.push(data.count1,data.count2,data.count3,data.count4,data.count5,data.count6);
      var option = null;
        option = {
            backgroundColor: '#2c343c',

            title: {
                text: '出行方式分析',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },

            visualMap: {
                show: false,
                min: 1,
                max: 90,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '出行方式',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data,
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
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
