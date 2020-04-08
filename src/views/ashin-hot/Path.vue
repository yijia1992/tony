<template>
  <div class="container">
    <div id="container" style="height:800px"></div>

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
      datas:[]
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
        const groups = await ashin.getPointGroups()
        this.datas = groups
      } catch (error) {
        if (error.code === 10020) {
          this.datas = []
        }
      }


    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例

      let myChart = this.$echarts.init(document.getElementById('container'))
      let echarts = this.$echarts;
      // 绘制图表
      require('echarts/extension/bmap/bmap');
      var data = this.datas;
      var hStep = 300 / (data.length - 1);
      var option = null;
      var lines = [].concat.apply(
        [],
         data.map(function(line,idx){
           var oneline = new Array();
           line.map(function(data,ind){
             var item = new Array();
             item.push(data.lng);
             item.push(data.lat);
             oneline.push(item);
           })

           return {
             coords:oneline,
             lineStyle: {
               normal: {
                 color: echarts.color.modifyHSL(
                         "#5A94DF",
                         Math.round(hStep * idx)
                 )
               }
             }
           }
         })
      );
      console.log(lines);
      myChart.setOption(
              (option = {
                bmap: {
                  center: [123.38,41.813],
                  zoom: 10,
                  roam: true,
                  mapStyle: {
                    styleJson: [
                      {
                        featureType: "water",
                        elementType: "all",
                        stylers: {
                          color: "#031628"
                        }
                      },
                      {
                        featureType: "land",
                        elementType: "geometry",
                        stylers: {
                          color: "#000102"
                        }
                      },
                      {
                        featureType: "highway",
                        elementType: "all",
                        stylers: {
                          visibility: "off"
                        }
                      },
                      {
                        featureType: "arterial",
                        elementType: "geometry.fill",
                        stylers: {
                          color: "#000000"
                        }
                      },
                      {
                        featureType: "arterial",
                        elementType: "geometry.stroke",
                        stylers: {
                          color: "#0b3d51"
                        }
                      },
                      {
                        featureType: "local",
                        elementType: "geometry",
                        stylers: {
                          color: "#000000"
                        }
                      },
                      {
                        featureType: "railway",
                        elementType: "geometry.fill",
                        stylers: {
                          color: "#000000"
                        }
                      },
                      {
                        featureType: "railway",
                        elementType: "geometry.stroke",
                        stylers: {
                          color: "#08304b"
                        }
                      },
                      {
                        featureType: "subway",
                        elementType: "geometry",
                        stylers: {
                          lightness: -70
                        }
                      },
                      {
                        featureType: "building",
                        elementType: "geometry.fill",
                        stylers: {
                          color: "#000000"
                        }
                      },
                      {
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: {
                          color: "#857f7f"
                        }
                      },
                      {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: {
                          color: "#000000"
                        }
                      },
                      {
                        featureType: "building",
                        elementType: "geometry",
                        stylers: {
                          color: "#022338"
                        }
                      },
                      {
                        featureType: "green",
                        elementType: "geometry",
                        stylers: {
                          color: "#062032"
                        }
                      },
                      {
                        featureType: "boundary",
                        elementType: "all",
                        stylers: {
                          color: "#465b6c"
                        }
                      },
                      {
                        featureType: "manmade",
                        elementType: "all",
                        stylers: {
                          color: "#022338"
                        }
                      },
                      {
                        featureType: "label",
                        elementType: "all",
                        stylers: {
                          visibility: "off"
                        }
                      }
                    ]
                  }
                },
                series: [
                  {
                    type: "lines",
                    coordinateSystem: "bmap",
                    polyline: true,
                    data: lines,
                    silent: true,
                    lineStyle: {
                      // color: '#c23531',
                      // color: 'rgb(200, 35, 45)',
                      opacity: 0.2,
                      width: 1
                    },
                    progressiveThreshold: 500,
                    progressive: 200
                  },
                  {
                    type: "lines",
                    coordinateSystem: "bmap",
                    polyline: true,
                    data: lines,
                    lineStyle: {
                      width: 0
                    },
                    effect: {
                      constantSpeed: 20,
                      show: true,
                      trailLength: 0.1,
                      symbolSize: 1.5
                    },
                    zlevel: 1
                  }
                ]
              })
      );
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
