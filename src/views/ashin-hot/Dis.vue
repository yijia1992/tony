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
        const res = await ashin.getDis()
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
                text: '通勤距离区间分析'
            },
            xAxis: {
                type: 'category',
                data: ['0-3000米', '3000-7000米', '7000-11000米', '11000-16000米', '16000-25000米', '大于25000米']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: arr,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
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
