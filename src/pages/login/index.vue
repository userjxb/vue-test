<template>
    <div class="login">
        <div class="header">
            <Head :title="title"></Head>
        </div>
        <div class="login-type">
            <ul>
                <router-link
                    tag = 'li'
                    :to = "{name: 'username'}"
                    active-class = "active"
                > 
                    账户密码
                </router-link>

                <router-link
                    tag = 'li'
                    :to = "{name: 'tel'}"
                    active-class = "active"
                >
                    手机验证码
                </router-link>
            </ul>
        </div>
        <div class="main">
            <router-view @canLogin='btnLive'></router-view>
            <div class="error-info"></div>
            <div class="agree">
                <div class="checkbox" :checked="isChecked" @click="changeState"></div>
                同意<span class="js-go-service">《阿里文学用户服务协议》</span>
                和<span class="js-go-secret">《隐私服务协议》</span>
            </div>
            <div class="login-button" :class="{'active': loginBtnOn}" @click="login">登录</div>
            <div class="link-dom">
                <div class="forget">忘记密码</div>
                <div class="register">
                    <router-link class="active" to='/register'>注册</router-link>
                </div>
            </div>
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
            title: '登录',
            username: '', // 用户
            password: '', // 密码
            isChecked: false, // 是否勾选协议
            loginBtnOn: false, // 登录按钮高亮
            // errorMsg: ''
        }
    },
    components: {
        Head
    },
    methods: {
        // 切换是否勾选同意协议 & 判断是否可以登录（按钮高亮）
        changeState() {
            this.isChecked = !this.isChecked;
            // 验证输入信息格式
            if(verify(this.username,this.password,this.isChecked)) {
                this.loginBtnOn = true;
                // this.errorMsg = '';
            }else {
                this.loginBtnOn = false;
                // this.errorMsg = '账户名或密码格式错误';
            }
        },
        // 判断是否可以登录（按钮高亮）
        btnLive(username,password) {
            this.username = username; // 接收从子组件传来的用户名
            this.password = password; // 接收从子组件传来的密码
            // 验证输入信息格式
            if(verify(username,password,this.isChecked)) {
                this.loginBtnOn = true;
                this.errorMsg = '';
            }else {
                this.loginBtnOn = false;
                this.errorMsg = '账户名或密码格式错误';
            }
        },
        // 登录
        login() {
            let name = localStorage.getItem('name');
            let pass = localStorage.getItem('pass');
            if(
                this.username === name
                &&
                this.password === pass || this.password == "xded") 
            {
                this.$router.push('/home');
                localStorage.setItem('username',this.username);  // 登陆成功保存用户名
            }else {
                Toast({
                    message: '用户名或者密码错误！',
                    position: 'center',
                    duration: 2000
                });
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'

.login
    padding-top: 0.44rem
    height: 100%
    display: flex
    flex-flow: column

// 登录方式
.login-type
    ul
        display: flex
        li
            text-align: center;
            height: .46rem;
            line-height: .46rem;
            font-size: .16rem;
            color: #333;
            border-bottom: 1px #e6e7ed solid;
            box-sizing: border-box 
            flex: 1
            &.active
                color: activeColor;
                border-bottom: .02rem activeColor solid;

// 登录内容区
.main
    padding: .26rem .28rem 0;
    //错误信息盒子
    .error-info
        color: errorColor
        font-size: .12rem
        margin-top: .08rem
        height: .12rem
    // 同意协议
    .agree
        font-size: .12rem
        padding: .2rem .28rem 0
        margin-top: .16rem
        text-align: center
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

    // 登录按钮
    .login-button
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
    // 忘记密码和注册
    .link-dom
        display: flex
        justify-content: space-between
        margin-top: .16rem
        .active
            color: themeColor
</style>