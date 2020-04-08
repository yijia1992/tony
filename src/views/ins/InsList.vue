<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">医保账户列表</div></div>
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
    <ins-edit v-else @editClose="editClose" :editID="editID"></ins-edit>
  </div>
</template>

<script>
import ins from '@/models/ins'
import LinTable from '@/components/base/table/lin-table'
import InsEdit from './InsEdit'

export default {
  components: {
    LinTable,
    InsEdit,
  },
  data() {
    return {
      tableColumn: [
              { prop: 'id', label: '账户ID' },
              { prop: 'name', label: '姓名' },
              { prop: 'sstatus', label: '账户状态' },
              { prop: 'money', label: '账户余额' },
              { prop: 'type', label: '参保方式' },
        ],
      tableData: [],
      operate: [],
      showEdit: false,
      editID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getinsList()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除账户',
      },
    ]
    this.loading = false
  },
  methods: {
    async getinsList() {
      try {
        const insList = await ins.getInsList()
        this.tableData = insList
      } catch (error) {
        this.$message({
          type: 'success',
          message:error.data.message,
        })
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await ins.deleteIns(val.row.id)
        if (res.code < window.SUCCESS_CODE) {
          this.getinsList()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }else{
          this.$message.warning(`${res.message}`)
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getinsList()
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
