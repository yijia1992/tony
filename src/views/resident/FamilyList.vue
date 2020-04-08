<template>
    <div>
        <!-- 列表页面 -->
        <div v-if="!showPanel">
            <div class="container" v-if="!showEdit">
                <div class="header"><div class="title">居民基础信息</div></div>
                <!-- 表格 -->
                <lin-table
                        :tableColumn="tableColumn"
                        :tableData="tableData"
                        :operate="operate"
                        @handleEdit="handleEdit"
                        @showRelation="showRelation"
                        @row-click="rowClick"
                        v-loading="loading"
                ></lin-table>
            </div>

            <!-- 编辑页面 -->
            <family-edit v-else @editClose="editClose" :residentID="editResID"></family-edit>
        </div>
        <family-panel v-else @editClose="editClose" :residentID="editResID"></family-panel>
    </div>
</template>

<script>
    import resident from '@/models/resident'
    import LinTable from '@/components/base/table/lin-table'
    // import ResidentEdit from './ResidentEdit'
    //import FamilyEdit from "./ResidentEdit";
    import FamilyEdit from "./FamilyEdit";
    import FamilyPanel from './FamilyPanel'

    export default {
        components: {
            LinTable,
            FamilyEdit,
            FamilyPanel
        },
        data() {
            return {
                tableColumn: [
                    { prop: 'username', label: '用户名' },
                    { prop: 'name', label: '姓名' },
                    { prop: 'age', label: '年龄' },
                    { prop: 'sgender', label: '性别' },
                    { prop: 'phone', label: '手机号'},
                    { prop: 'parent_name', label: '父母(之一)'},
                    { prop: 'lover_name', label: '配偶'},
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
            await this.getFamilies()
            this.operate = [
                { name: '家庭关系', func: 'showRelation', type: 'info' },
                { name: '编辑', func: 'handleEdit', type: 'primary' },
                // {
                //     name: '删除居民',
                //     func: 'handleDelete',
                //     type: 'danger',
                //     //permission: '删除',
                // },
            ]
            this.loading = false
        },
        methods: {
            async getFamilies() {
                try {
                    const families = await resident.getFamilies()
                    this.tableData = families
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
            showRelation(val){
                console.log('val', val)
                 this.showPanel = true
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
                        this.getBooks()
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
                this.getFamilies()
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
