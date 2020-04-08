<template>
  <div class="container">
    <el-card class="box-card">
      <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择开始时间">
    </el-date-picker>
      <el-date-picker
              style="margin-left: 20px"
              v-model="form.end_time"
              type="datetime"
              placeholder="选择结束时间">
      </el-date-picker>
      <el-button style="margin-left: 10px" type="primary" @click="submitTime()">保 存</el-button>
    </el-card>
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
    async getData(obj) {
      try {
        const res = await ashin.getDataHot(obj)
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

      var points = [].concat.apply(
              [],
              data.map(function(track) {
                return track.map(function(seg) {
                  return seg.coord.concat([1]);
                });
              })
      );
      console.log(points);
      myChart.setOption(
              (option = {
                animation: false,
                bmap: {
                  center: [123.38,41.813],
                  zoom: 14,
                  roam: true
                },
                visualMap: {
                  show: false,
                  top: "top",
                  min: 0,
                  max: 5,
                  seriesIndex: 0,
                  calculable: true,
                  inRange: {
                    color: ["blue", "blue", "green", "yellow", "red"]
                  }
                },
                series: [
                  {
                    type: "heatmap",
                    coordinateSystem: "bmap",
                    data: points,
                    pointSize: 5,
                    blurSize: 6
                  }
                ]
              })
      );
      // 添加百度地图插件
      var bmap = myChart
              .getModel()
              .getComponent("bmap")
              .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
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
