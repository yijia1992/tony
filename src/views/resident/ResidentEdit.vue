<template>
    <div class="container">
        <div class="title">
            <span>修改居民信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
        </div>
        <el-divider></el-divider>
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
                        <el-form-item label="姓名" prop="title">
                            <el-input size="medium" v-model="form.name" placeholder="请填写姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="author">
                            <el-input size="medium" v-model="form.age" placeholder="请填写年龄"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="image">
                            <el-input size="medium" v-model="form.user_no" placeholder="请填写身份证号"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="image">
                            <el-input size="medium" v-model="form.phone" placeholder="请填写手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio v-model="form.gender" :label="1" >男</el-radio>
                            <el-radio v-model="form.gender" :label="0" >女</el-radio>
                        </el-form-item>
                        <el-form-item label="是否低保" prop="is_poor">
                            <el-radio v-model="form.is_poor" :label="1" >是</el-radio>
                            <el-radio v-model="form.is_poor" :label="0" >否</el-radio>
                        </el-form-item>
                        <el-form-item label="是否暂住" prop="is_temp">
                            <el-radio v-model="form.is_temp" :label="1" >是</el-radio>
                            <el-radio v-model="form.is_temp" :label="0" >否</el-radio>
                        </el-form-item>
                        <el-form-item label="封面" prop="cover">
                            <el-input v-model="form.avatar" autocomplete="off" placeholder="图片 URL"></el-input>
                            <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                        </el-form-item>
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
    import ImgUpload from './ImgUpload'
    export default {
        props: {
            residentID: {
                type: Number,
            },
        },
        components:{
          ImgUpload
        },
        data() {
            return {
                loading: false,
                form: {
                    id:this.residentID,
                    title: '',
                    author: '',
                    summary: '',
                    image: '',
                    gender:1,
                    avatar:"",
                    is_poor:0,
                    is_temp:0
                },
            }
        },
        async mounted() {
            this.loading = true
            // this.form = await book.getBook(this.editResID)
            this.form = await  resident.getResident(this.residentID)
            this.loading = false
        },
        methods: {
            async submitForm() {
                // const res = await book.editBook(this.editResID, this.form)
                const res = await resident.editResidents(this.residentID, this.form)
                if (res.code < window.SUCCESS_CODE) {
                    this.$message.success(`${res.message}`)
                    this.$emit('editClose')
                }else{
                    this.$message.warning(`${res.message}`)
                }
            },
            //上传成功后展示到表单上
            uploadImg (){
                // 拿到上传组件中的值
                this.form.avatar = this.$refs.imgUpload.url
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
