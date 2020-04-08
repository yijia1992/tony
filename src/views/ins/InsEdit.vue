<template>
  <div class="container">
    <div class="title">
      <span>修改医保信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="账户余额" prop="title">
              <el-input size="medium" v-model="form.money" placeholder="请填写书名"></el-input>
            </el-form-item>
            <el-form-item label="缴费途径" prop="author">
              <el-input size="medium" v-model="form.type" placeholder="请填写作者"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio v-model="form.status" :label="1" >正常参保</el-radio>
              <el-radio v-model="form.status" :label="0" >欠费</el-radio>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ins from '@/models/ins'

export default {
  props: {
    editID: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        id:0,
        status:0,
        money:0,
        type:""
      },
    }
  },
  async mounted() {
    this.loading = true
    this.form = await ins.getIns(this.editID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await ins.editIns(this.editID, this.form)
      if (res.code < window.SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      }else{
        this.$message.warning(`${res.message}`)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
