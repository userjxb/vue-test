<template>
    <div class="pass-modify">
        <div class="header">
            <Head :title="title"></Head>
        </div>
        <div class="content">
            <div class="pass-input">
                <form action="">
                    <p>
                        <span class="sign">原密码</span><input type="password" placeholder="请输入原密码" v-model="pass">
                    </p>
                    <p>
                        <span class="sign">新密码</span><input type="password" placeholder="请输入新密码" v-model="repass">
                    </p>
                </form>
            </div>
            <div class="yes-btn" :class="{ 'active': yesBtnOn }" @click="modifyPass">确定</div>
        </div>
    </div>
</template>

<script>
import Head from 'components/common/Head'
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            title: '修改密码',
            pass: '',  // 原密码
            repass: '', // 新密码
            yesBtnOn: true
        }
    },
    components: {
        Head
    },
    methods: {
        modifyPass() {
            let password = localStorage.getItem('pass');

            if(this.pass != password) {
                Toast({
                    message: '原密码错误！',
                    position: 'center',
                    duration: 2000
                });
            }else if(this.pass == this.repass) {
                Toast({
                    message: '新密码不能与原密码相同！',
                    position: 'center',
                    duration: 2000
                });
            }else {
                Toast({
                    message: '修改成功！',
                    position: 'center',
                    duration: 2000
                });
                localStorage.setItem('pass',this.repass);
                this.$router.back();
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'

.pass-modify
    display: flex
    flex-flow: column
    .header
        height: .44rem
    .content
        padding: .26rem .28rem 0
.pass-input
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
// 确认按钮
.yes-btn
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
