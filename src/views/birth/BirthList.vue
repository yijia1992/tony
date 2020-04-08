<template>
    <div>
        <!-- 列表页面 -->
        <div class="container">
            <div class="header"><div class="title">妇女生育信息-计划生育档案</div></div>
            <!-- 表格 -->
            <el-row class="button-panel">
                <el-button type="primary" v-on:click="getWomen(0)">常住妇女</el-button>
                <el-button type="primary" v-on:click="getWomen(1)">暂住妇女</el-button>
            </el-row>

            <el-row>
                <el-table :data="tableData" >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <div class="children-content">
                                <div v-for="item in props.row.children" class="children">
                                    <img :src="item.avatar" alt/>
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="姓名">
                                            <span>{{ item.name }}</span>
                                        </el-form-item>
                                        <el-form-item label="年龄">
                                            <span>{{ item.age }}</span>
                                        </el-form-item>
                                        <el-form-item label="身份证">
                                            <span>{{ item.user_no }}</span>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed prop="name" label="姓名" fit></el-table-column>
                    <el-table-column prop="age" label="年龄" fit></el-table-column>
                    <el-table-column prop="lover.name" label="配偶" fit></el-table-column>
                    <el-table-column prop="children_count" label="生育个数" fit></el-table-column>
<!--                    <el-table-column prop="zip" label="邮编" width="120"></el-table-column>-->
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
    import resident from '@/models/resident'

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
            await this.getWomen(this.isTemp)
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
            async getWomen(isTemp) {
                try {
                    const residents = await resident.getWomen(isTemp)
                    this.tableData = residents
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
                this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    const res = await book.delectBook(val.row.id)
                    if (res.code < window.SUCCESS_CODE) {
                        this.getWomen()
                        this.$message({
                            type: 'success',
                            message: `${res.message}`,
                        })
                    }
                })
            },
            rowClick() {},
            editClose() {
                this.showEdit = false
                this.showPanel = false
                this.getResidents()
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
