<template>
    <div>
        <!-- 列表页面 -->
        <div class="container" v-if="!showEdit">
            <div class="header"><div class="title">居民基础信息</div></div>
            <!-- 表格 -->
            <lin-table
                    :tableColumn="tableColumn"
                    :tableData="tableData"
                    :operate="operate"
                    @handleEdit="handleEdit"
                    @handleDelete="handleDelete"
                    @row-click="rowClick"
                    v-loading="loading"
            ></lin-table>
        </div>
        <!-- 编辑页面 -->
        <resident-edit v-else @editClose="editClose" :residentID="editResID"></resident-edit>

    </div>
</template>

<script>
    import resident from '@/models/resident'
    import LinTable from '@/components/base/table/lin-table'
    import FamilyPanel from './FamilyPanel'
    import ResidentEdit from "./ResidentEdit"

    export default {
        components: {
            LinTable,
            ResidentEdit,
            FamilyPanel
        },
        data() {
            return {
                tableColumn: [
                    { prop: 'username', label: '用户名' },
                    { prop: 'name', label: '姓名' },
                    { prop: 'age', label: '年龄' },
                    { prop: 'user_no', label: '身份证号' },
                    { prop: 'phone', label: '手机号'},
                    { prop: 's_poor', label: '是否低保'},
                    { prop: 's_temp', label: '居民类型'}
                    ],
                tableData: [],
                operate: [],
                showEdit: false,
                editResID: 1,
                showPanel:false
            }
        },
        async created() {
            this.loading = true
            await this.getResidents()
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
            async getResidents() {
                try {
                    const residents = await resident.getResidents()
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
                        this.getResidents()
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
    }
</style>
