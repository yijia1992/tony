<template>
    <div>
        <!-- 列表页面 -->
        <div class="container">
            <div class="header"><div class="title">水电燃气账单运行情况</div></div>
            <!-- 表格 -->
            <el-row class="button-panel">
                <el-button type="primary" v-on:click="getBillsByType(1)">水费</el-button>
                <el-button type="primary" v-on:click="getBillsByType(2)">电费</el-button>
                <el-button type="primary" v-on:click="getBillsByType(3)">燃气费</el-button>
            </el-row>

            <el-row>
                <el-table :data="tableData" >

                    <el-table-column fixed prop="name" label="姓名" fit></el-table-column>
                    <el-table-column prop="money" label="费用" fit></el-table-column>
                    <el-table-column prop="time" label="出账时间" fit></el-table-column>
                    <el-table-column prop="stype" label="费用类型" fit></el-table-column>

<!--                    <el-table-column label="操作" width="140" fixed="right">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button @click="handleClick(scope.row)" type="primary" plain size="mini">编辑</el-button>-->
<!--                            <el-button type="danger" size="mini" plain>删除</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </el-row>

        </div>




    </div>
</template>

<script>
    import bill from '@/models/bill'

    export default {
        components: {

        },
        data() {
            return {
                tableData: [],

               // isTemp:0
            }
        },
        async created() {
            this.loading = true
            await this.getBills()

            this.loading = false
        },
        methods: {
            async getBills() {
                try {
                    const bills = await bill.getBills()
                    this.tableData = bills
                } catch (error) {
                    if (error.code === 10020) {
                        this.tableData = []
                    }
                }
            },
            async getBillsByType(type) {
                try {
                    const bills = await bill.getBillsByType(type)
                    this.tableData = bills
                } catch (error) {
                    if (error.code === 10020) {
                        this.tableData = []
                    }
                }
            }



        },
    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 0 30px;

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
        .button-panel{
            padding: 10px 0;
        }

        .children-content{
            display: flex;
            flex-direction: row;
            justify-content: left;
        }
        .children {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            padding-left: 10px;
            border-radius: 5px;
            box-shadow: 0px 2px 14px 0px #f3f3f3;
            img {
                width: 135px;
                height: 135px;
                border-radius: 70px;
            }

            .demo-table-expand {
                font-size: 0;
                margin-left: 30px;
                display: flex;
                flex-direction: column;
                //height: 150px;

                label {
                    width: 90px;
                    color: #99a9bf;
                }

                .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    height: 40px;
                    display: flex;
                    flex-direction: row;
                }
            }
        }
    }
</style>
