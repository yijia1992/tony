<template>
    <div class="container">
        <div class="title">
            <span>设置家庭关系</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
        </div>
        <el-divider></el-divider>
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="form" status-icon ref="form" label-width="120px" v-loading="loading" @submit.native.prevent>
                        <el-form-item label="父母身份证号(写一个)" prop="title">
                            <el-input size="medium" v-model="form.parent_no" placeholder="请填写父母身份证"></el-input>
                        </el-form-item>
                        <el-form-item label="配偶身份证号" prop="author">
                            <el-input size="medium" v-model="form.lover_no" placeholder="请填写配偶身份证"></el-input>
                        </el-form-item>
<!--                        <el-form-item label="身份证号" prop="image">-->
<!--                            <el-input size="medium" v-model="form.user_no" placeholder="请填写身份证号"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="手机号" prop="image">-->
<!--                            <el-input size="medium" v-model="form.phone" placeholder="请填写手机号"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="简介" prop="summary">-->
<!--                            <el-input size="medium" type="textarea" :rows="4" placeholder="请输入简介" v-model="form.summary">-->
<!--                            </el-input>-->
<!--                        </el-form-item>-->
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
    import resident from '@/models/resident'

    export default {
        props: {
            residentID: {
                type: Number,
            },
        },
        data() {
            return {
                loading: false,
                form: {
                    id:this.residentID,
                    parent_no:"",
                    lover_no:"",
                    title: '',
                    author: '',
                    summary: '',
                    image: '',
                },
            }
        },
        async mounted() {
            this.loading = true
            // this.form = await book.getBook(this.editResID)
            this.form = await  resident.getRelation(this.residentID)
            this.loading = false
        },
        methods: {
            async submitForm() {
                // const res = await book.editBook(this.editResID, this.form)
                const res = await resident.editRelation(this.residentID, this.form)
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
