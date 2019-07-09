<template>
    <div class="tel">
        <div class="login-input">
            <form action="">
                <p>
                    <span class="sign">手机号</span>
                    <input type="text" placeholder="请输入手机号" v-model="username" @input="send">
                    <i class="clear" v-show="userClearShow" @click="clear('user')"></i>
                </p>
                <p>
                    <span class="sign">校验码</span><input type="text" maxlength="4" v-model="vcode" @input="send">
                    <img src="../../assets/img/vcode.png" alt="">
                </p>
                <!-- <p>
                    <span class="sign">验证码</span><input type="text">
                    <span class="get-vcode">获取验证码</span>
                </p> -->
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            vcode: '',
            userClearShow: false,
            passClearShow: false
        }
    },
    methods : {
        send(){
            this.$emit('canLogin',this.username,this.vcode);
        },
        // 清空输入的内容
        clear(target) {
            target === 'user' && (this.username = '')
        }
    },
    updated() {
        // 控制清空按钮的显示和隐藏
        this.username != ''? (this.userClearShow = true) : (this.userClearShow = false);
    }
}
</script>


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
        // 验证码图片
        img
            width: .6rem
            height: .27rem
            position: absolute
            right: 0rem
            bottom: .03rem
        // 获取验证码
        .get-vcode
            margin-top: 6px
            height: .25rem
            line-height: .25rem
            padding: 0 .09rem
            font-size: .12rem
            color: #fff
            background-color: themeColor
            border-radius: .03rem
            text-align: center
            position: absolute
            right: -0.28rem
            bottom: 0
</style>
