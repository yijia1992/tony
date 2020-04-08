<template>
  <div class="container">
    <div class="title">新增计划生育服务</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="地址" prop="author">
              <el-input size="medium" v-model="form.address" placeholder="请填写服务地址"></el-input>
            </el-form-item>
            <el-form-item label="计生服务内容" prop="content">
              <el-input
                size="medium"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请填写服务内容"
                v-model="form.content"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="计生服务开始时间" prop="start_time">
              <el-date-picker
                      v-model="form.start_time"
                      type="datetime"
                      placeholder="选择日期时间">
              </el-date-picker>
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

import act from '@/models/act'

export default {
  data() {
    return {
      form: {
        content: '',
        address: '',
        start_time: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await act.addOrEditAct(this.form)
        if (res.code < window.SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('活动添加失败，请检测填写信息')
        console.log(error)
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
