<template>
    <div class="container">
        <div class="title">
            <span>个人中心</span>
<!--            <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>-->
        </div>
        <el-divider></el-divider>
        <i class="cate"> 个人中心</i>
        <div class="panel-row">
            <div class="card">
                <b class="title">个人信息</b>
                <b>姓名:{{info.name}}</b>
                <b>身份证:{{info.user_no}}</b>
                <b>年龄:{{info.age}}</b>
                <b>性别:{{info.gender==1?"男":"女"}}</b>
            </div>
            <div class="card">
                <b class="title">医保信息</b>
                <b>金额:{{ins.money}}</b>
                <b>当前:{{ins.status==1?"正常缴纳":"欠费"}}</b>
                <b>类型:{{ins.type}}</b>
            </div>
        </div>

        <i class="cate"> 计生服务</i>
        <div class="panel-col">
            <div v-for="item in acts" class="birthitem">
                <p class="content">
                    info：{{item.content}}
                </p>
                <b>地址：{{item.address}}</b>
                <b>时间：{{item.sstart_time}}</b>
            </div>
        </div>

<!--        <i class="cat">燃气费</i>-->
<!--        <div class="panel-row">-->
<!--            <div  class="card">-->
<!--                <b>当前:{{item.time}}</b>-->
<!--                <b>金额:{{item.money}}</b>-->
<!--                <b>类型:{{item.stype}}</b>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import resident from '@/models/resident'
    import ins from '@/models/ins'
    import act from '@/models/act'
    export default {
        name: "PersonPanel",
        props: {
            residentID: {
                type: Number,
            },
        },
        async mounted() {
            this.loading = true
            let uid = this.$store.state.user.id;
            this.ins = await  ins.getInsById(uid)
            this.info = await  resident.getResidentById(uid)
            this.acts = await  act.getActs()
            this.loading = false
        },
        data() {
            return {
                loading: false,
                info:{},
                ins:{},
                acts:[]

            }
        },
        methods:{
            back() {
               // this.$emit('editClose')
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
    .panel-col{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
        margin-bottom: 20px;
        .birthitem{
            width: 500px;
            /*height: 250px;*/
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 2px 14px 0px #f3f3f3;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        p{
            padding: 5px;
        }
        b{
            display: block;
            text-align: center;
            line-height: 20px;
            font-size: 15px;
            margin-top: 20px;
        }
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
            //text-indent: 40px;
            text-align: center;

            .back {
                float: right;
                margin-right: 40px;
                cursor: pointer;
            }
        }
    }
</style>
