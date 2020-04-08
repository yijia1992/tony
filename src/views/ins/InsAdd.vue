<template>
  <div class="container">
    <div class="title">新建低保账户</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="身份证" prop="user_no">
              <el-input size="medium" v-model="form.user_no" placeholder="请填写身份证"></el-input>
            </el-form-item>
            <el-form-item label="账户余额" prop="money">
              <el-input size="medium" v-model="form.money" placeholder="请填写账户余额"></el-input>
            </el-form-item>
            <el-form-item label="缴费途径" prop="type">
              <el-input size="medium" v-model="form.type" placeholder="自费或单位名"></el-input>
            </el-form-item>
<!--            <el-form-item label="账户状态" prop="status">-->
<!--              <el-radio v-model="form.status" :label="1" >正常</el-radio>-->
<!--              <el-radio v-model="form.status" :label="0" >欠费</el-radio>-->
<!--            </el-form-item>-->
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
  data() {
    return {
      form: {
        user_no: '',
        money:0,
        type: '',
        status:1,
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await ins.addIns(this.form)
        console.log(res);
        if (res.code < window.SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }else{
          this.$message.warning(`${res.message}`)
        }
      } catch (error) {
        //参数验证错误时进入catch，没法提示具体原因
        console.log(error)
        this.$message.error('添加账户失败，请填写有效信息')
        //console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
