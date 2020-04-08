<template>
    <div class="container">
        <div class="title">
            <span>家庭关系</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
        </div>
        <el-divider></el-divider>
        <i class="cate"> 父母</i>
        <div  class="panel-row">
            <div v-if="info.mather!=null" class="card">
                <img :src="info.mather.avatar" alt="">
                <b>姓名:{{info.mather.name}}</b>
                <b>年龄:{{info.mather.age}}</b>
            </div>
            <div v-if="info.father!=null"   class="card">
                <img :src="info.father.avatar" alt="">
                <b>姓名:{{info.father.name}}</b>
                <b>年龄:{{info.father.age}}</b>
            </div>
        </div>
        <i class="cat">孩子</i>
        <div class="panel-row">

                <div v-for="(item, index) in info.children" class="card">
                    <img :src="item.avatar" alt="">
                    <b>姓名:{{item.name}}</b>
                    <b>年龄:{{item.age}}</b>
                </div>

        </div>

        <i class="cat">爱人</i>
        <div class="panel-row">
            <div v-if="info.lover!=null"   class="card">
                <img :src="info.lover.avatar" alt="">
                <b>姓名:{{info.lover.name}}</b>
                <b>年龄:{{info.lover.age}}</b>
            </div>
        </div>

    </div>
</template>

<script>
    import resident from '@/models/resident'
    export default {
        name: "FamilyPanel",
        props: {
            residentID: {
                type: Number,
            },
        },
        async mounted() {
            this.loading = true
            // this.form = await book.getBook(this.editResID)
            this.info = await  resident.getPanel(this.residentID)
            this.loading = false
        },
        data() {
            return {
                loading: false,
                info:{}

            }
        },
        methods:{
            back() {
                this.$emit('editClose')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-divider--horizontal {
        margin: 0;
    }
    .panel-row{
        display: flex;
        flex-direction: row;
        justify-content: left;
        margin-top: 10px;
        margin-bottom: 20px;

    }

    .card{
        width: 220px;
        height: 250px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 2px 14px 0px #f3f3f3;
        display: flex;
        flex-direction: column;
        align-items: center;
        b{
            display: block;
            text-align: center;
            line-height: 20px;
            font-size: 20px;
            margin-top: 20px;
        }
        img{
            width: 110px;
            height: 110px;
            border-radius: 55px;
            box-shadow: 0 0 20px 0 #cfd5e3;
        }
    }

    .container {
        .cate{
            display: block;
            margin-top: 5px;
        }
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
    }
</style>
