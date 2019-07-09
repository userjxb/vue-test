<template>
     <header>
            <div class="left back" @click="back"></div>
            <router-link class="right home" to="/home"></router-link>
            <h1 class="title">{{ title }}</h1>
    </header>
</template>
<style lang="stylus" scoped>
header{
    position: fixed;
    width:100%;
    height: 0.44rem;
    top: 0;
    left: 0;
    line-height: 0.44rem;
    border-bottom:1px solid #f3f3f3;
    background: #fff;
    z-index: 100;
}
header h1{
    font-size: .16rem;
    font-weight: normal;
    text-align: center;
}
.left{
    float: left;
}
.right{
    float: right;
}
header .back,header .home{
display: inline-block;
width: .5rem;
height: .44rem;
}
header .back{
    background: url(../../assets/img/backIcon_ba492d1.png) no-repeat center;
    background-size: .22rem .18rem;
}
header .home{
    background: url(../../assets/img/home_48a04f5.png) no-repeat center;
    background-size: .20rem .20rem;
}
</style>

<script>
export default {
    props: ['title'],
    methods: {
        // 编程式导航，返回到上一页
        back() {
            this.$router.back();
        }
    }
}
</script>
