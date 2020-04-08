<template>
    <div>
        <!-- 列表页面 -->
        <div class="container">
            <div class="header"><div class="title">计划生育活动列表</div></div>

            <el-row>
                <el-table :data="tableData" >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <div class="children-content">
                                <div>{{props.row.content}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed prop="id" label="服务编号" fit></el-table-column>
                    <el-table-column prop="address" label="地址" fit></el-table-column>
                    <el-table-column prop="sstart_time" label="开始时间" fit></el-table-column>
                    <el-table-column  label="操作" fixed="right" width="175">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleDelete(scope)"
                            >删除</el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
    </div>
</template>

<script>
    import act from '@/models/act'

    export default {
        components: {

        },
        data() {
            return {
                tableData: [],

                isTemp:0
            }
        },
        async created() {
            this.loading = true
            await this.getActs()
            this.operate = [
                { name: '编辑', func: 'handleEdit', type: 'primary' },
                {
                    name: '删除居民',
                    func: 'handleDelete',
                    type: 'danger',
                    //permission: '删除',
                },
            ]
            this.loading = false
        },
        methods: {
            async getActs() {
                try {
                    const acts = await act.getActs()
                    this.tableData = acts
                } catch (error) {
                    if (error.code === 10020) {
                        this.tableData = []
                    }
                }
            },
            handleEdit(val) {
                console.log('val', val)
                this.showEdit = true
                this.editResID = val.row.id
            },
            handleDelete(val) {
                this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    const res = await act.deleteAct(val.row.id)
                    if (res.code < window.SUCCESS_CODE) {
                        this.getActs()
                        this.$message({
                            type: 'success',
                            message: `${res.message}`,
                        })
                    }
                })
            },
            rowClick() {},
            editClose() {

                this.getWomen()
            },
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
