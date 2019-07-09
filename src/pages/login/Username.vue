<template>
    <div class="username">
        <div class="login-input">
            <form action="">
                <p>
                    <span class="sign">账户</span>
                    <input type="text" placeholder="请输入手机号/邮箱" v-model="username" @input='send'>
                    <i class="clear" v-show="userClearShow" @click="clear('user')"></i>
                </p>
                <p>
                    <span class="sign">密码</span>
                    <input type="password" placeholder="请输入密码" v-model="password" @input='send'>
                    <i class="clear" v-show="passClearShow" @click="clear('pass')"></i>
                </p>
            </form>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'

// 登录输入信息
.login-input
    font-size: .16rem
    p
        border-bottom: 1px solid #f3f3f3
        margin-top: .22rem
        position: relative
        span
            color: #333
            line-height: .25rem
            margin-right: .28rem
        input
            border: 0 
            font-size: .16rem
            outline: none
        // 清空按钮
        .clear
            height: .2rem
            width: .2rem
            position: absolute
            right: 0
            top: 0
            background-image: url(../../assets/img/clear.png)
            background-size: .1rem .1rem
            background-position: center center
            background-repeat: no-repeat
</style>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            userClearShow: false,
            passClearShow: false
        }
    },
    methods : {
        send(){
            this.$emit('canLogin',this.username,this.password);
        },
        // 清空输入的内容
        clear(target) {
            target === 'user' && (this.username = '')
            target === 'pass' && (this.password = '')
        }
    },
    updated() {
        // 控制清空按钮的显示和隐藏
        this.username != ''? (this.userClearShow = true) : (this.userClearShow = false);
        this.password != ''? (this.passClearShow = true) : (this.passClearShow = false);
    }
}
</script>
