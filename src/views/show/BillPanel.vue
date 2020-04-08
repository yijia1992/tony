<template>
    <div class="container">
        <div class="title">
            <span>水电煤气</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
        </div>
        <el-divider></el-divider>
        <i class="cate"> 水费</i>
        <div class="panel-row">
            <div v-for="(item, index) in water" class="card">
                <b>当前:{{item.time}}</b>
                <b>金额:{{item.money}}</b>
                <b>类型:{{item.stype}}</b>
                <b>状态:{{item.status==1?"已缴费":"未缴费"}}</b>
                <el-button
                        v-if="item.status==0"
                        type="primary"
                        @click="pay(item.id)"
                        style="margin-top: 10px"
                >缴费</el-button>
            </div>
        </div>
        <i class="cat">电费</i>
        <div class="panel-row">
                <div v-for="(item, index) in elect" class="card">
                    <b>当前:{{item.time}}</b>
                    <b>金额:{{item.money}}</b>
                    <b>类型:{{item.stype}}</b>
                    <b>状态:{{item.status==1?"已缴费":"未缴费"}}</b>
                    <el-button
                            v-if="item.status==0"
                            type="primary"
                            @click="pay(item.id)"
                            style="margin-top: 10px"
                    >缴费</el-button>
                </div>
        </div>

        <i class="cat">燃气费</i>
        <div class="panel-row">
            <div v-for="(item, index) in gas"   class="card">
                <b>当前:{{item.time}}</b>
                <b>金额:{{item.money}}</b>
                <b>类型:{{item.stype}}</b>
                <b>状态:{{item.status==1?"已缴费":"未缴费"}}</b>
                <el-button
                        v-if="item.status==0"
                        type="primary"
                        @click="pay(item.id)"
                        style="margin-top: 10px"
                >缴费</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import bill from '@/models/bill'
    export default {
        name: "BillPanel",
        props: {
            residentID: {
                type: Number,
            },
        },
        async mounted() {
            this.loading = true
            this.initPage()
            this.loading = false
        },
        data() {
            return {
                loading: false,
                water:[],
                elect:[],
                gas:[]


            }
        },
        methods:{
            async initPage(){
                let uid = this.$store.state.user.id;
                this.water = await  bill.getMyBillsByType(uid,1)
                this.elect = await  bill.getMyBillsByType(uid,2)
                this.gas = await  bill.getMyBillsByType(uid,3)
            },

            async pay(id) {
                console.log(id);
                this.$confirm('确认缴费吗？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    const res = await bill.pay(id)
                    if (res.code < window.SUCCESS_CODE) {
                        this.initPage()
                        this.$message({
                            type: 'success',
                            message: `${res.message}`,
                        })
                    }
                })
            },
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
