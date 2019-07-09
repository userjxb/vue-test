<template>
    <div class="register">
        <div class="header">
            <Head :title="title"></Head>
        </div>
        <div class="main">
            <div class="register-input">
                <form action="">
                    <p>
                        <span class="sign">手机号</span><input type="text" placeholder="请输入手机号" v-model="username">
                    </p>
                    <p>
                        <span class="sign">密　码</span><input type="password" placeholder="请设置密码" v-model="password">
                    </p>
                </form>
            </div>
            <div class="error-info"></div>
            <div class="agree">
                <div class="checkbox" :checked="isChecked" @click="changeState"></div>
                同意<span class="js-go-service">《阿里文学用户服务协议》</span>
                和<span class="js-go-secret">《隐私服务协议》</span>
            </div>
            <div class="reg-button" :class="{'active': regBtnOn}" @click="register">免费注册</div>
        </div>
    </div>
</template>

<script>
import Head from 'components/common/Head'
import { Toast } from 'mint-ui'
import verify from 'utils/verify'

export default {
    data() {
        return {
            title: '注册',
            username: '',
            password: '',
            isChecked: false, // 是否勾选协议
            regBtnOn: false,
            // errorMsg: ''
        }
    },
    components: {
        Head
    },
    methods: {
        // 切换是否勾选同意协议 
        changeState() {
            this.isChecked = !this.isChecked;
        },
        // 注册,存储localStorage
        register() {
            if(this.regBtnOn) {
                localStorage.setItem('name',this.username);
                localStorage.setItem('pass',this.password);
                Toast({
                    message: '注册成功！',
                    position: 'center',
                    duration: 1000
                });
                this.$router.push('/login/username');
            }
        }
    },
    updated() {
        // 验证输入信息格式
        if(verify(this.username,this.password,this.isChecked)) {
            this.regBtnOn = true;
            // this.errorMsg = '';
        }else {
            this.regBtnOn = false;
            // this.errorMsg = '手机号或密码格式错误';
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'

.register
    height: 100%
    display: flex
    flex-flow: column

.header
    height: 0.44rem

.main
    padding: .26rem .28rem 0;
    // 注册输入信息
    .register-input
        font-size: .16rem
        flex: 1
        p
            border-bottom: 1px solid #f3f3f3
            margin-top: .22rem
            position: relative
            // 验证码图片
            img
                width: .6rem
                height: .27rem
                position: absolute
                right: .48rem
                bottom: .03rem
            // 切换验证码图片
            .change_vode
                font-size: .14rem 
                position: absolute
                right: -.28rem
                bottom: -.04rem
                color: themeColor
            span
                color: #333
                line-height: .25rem
                margin-right: .28rem
            input
                border: 0 
                font-size: .16rem
                outline: none
    //错误信息盒子
    .error-info
        color: errorColor
        font-size: .12rem
        margin-top: .08rem
        height: .12rem
    // 同意协议
    .agree
        font-size: .12rem
        padding: .2rem 0 0
        color: fontColor
        line-height: .2rem
        .checkbox
            width: .14rem
            height: .14rem
            border-radius: .14rem
            overflow: hidden
            -webkit-box-sizing: border-box
            box-sizing: border-box
            border: 1px solid #979797
            display: inline-block
            -webkit-transform: translateY(2px)
            transform: translateY(2px)
            &[checked]
                background: url(http://c-shuqi.11222.cn/assets/login-checked-icon_45b19bf.png)
                -webkit-background-size: 100% 100%
                background-size: 100% 100%
                border: 0
        span
            color: themeColor
    // 注册按钮
    .reg-button
        width: 100%
        height: .44rem
        font-size: .16rem
        background-color: #E6E7ED
        color: #C6C7CC
        text-align: center
        line-height: .44rem
        margin-top: .16rem
        border-radius: .04rem
        &.active
            background-color: themeColor
            color: #FFF
</style>
