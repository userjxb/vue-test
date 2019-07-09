<template>
    <div class="personal">
        <div class="header">
            <Head :title="title"></Head>
        </div>
        <div class="content">
            <div class="list">
                <div class="user">
                    <div class="user-info">
                        <div class="user-icon">
                            <img src="http://c-shuqi.11222.cn/assets/avatar_59f9244.png">
                        </div>
                        <div class="user-name" v-if="editUserInfo">
                            <div class="name"> {{ username }} </div>
                            <div class="user-id">id：1358212603</div>
                        </div>
                        <div class="user-name user-edit" v-else>
                            <input type="text" name="" id=""  v-model="username">
                        </div>
                    </div>
                    <button class="u-btn user-edit" v-if="editUserInfo" @click="changeUserInfoState">修改</button>
                    <button class="u-btn user-save" v-else @click="changeUserInfoState">保存</button>
                </div>
                <div class="list-block">
                    <!-- 我的余额 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="wallet"></i>
                        </div>
                        <div class="list-info">
                            <div class="list-name">我的余额</div>
                            <div class="list-opera">0书豆</div>
                        </div>
                    </div>
                    <!-- 我的余额 -->
                    <!-- 书豆充值 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="bean"></i>
                        </div>
                        <div class="list-info">
                            <div class="list-name">书豆充值</div>
                            <div class="list-opera">
                                <button class="button-fill">充值</button>
                            </div>
                        </div>
                    </div>
                    <!-- 书豆充值 -->
                    <!-- 充值记录 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="clock"></i>
                        </div>
                        <div class="list-info">
                            <div class="list-name">充值记录</div>
                            <div class="list-opera">
                                <img class="more-link" src="../../assets/img/more-link.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- 充值记录 -->
                    <!-- 消费记录 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="ubook"></i>
                        </div>
                        <div class="list-info no-border-bottom">
                            <div class="list-name">消费记录</div>
                            <div class="list-opera">
                                <img class="more-link" src="../../assets/img/more-link.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- 消费记录 -->
                </div>
                <div class="list-block">
                    <!-- 我的书架 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="shelf"></i>
                        </div>
                        <router-link tag="div" class="list-info" to="/bookcase">
                            <div class="list-name">我的书架</div>
                            <div class="list-opera">
                                <img class="more-link" src="../../assets/img/more-link.png" alt="">
                            </div>
                        </router-link>
                    </div>
                    <!-- 我的书架 -->
                    <!-- 密码管理 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="clocked"></i>
                        </div>
                        <router-link class="list-info" to="/passModify">
                            <div class="list-name">密码管理</div>
                            <div class="list-opera">
                                <img class="more-link" src="../../assets/img/more-link.png" alt="">
                            </div>
                        </router-link>
                    </div>
                    <!-- 密码管理 -->
                    <!-- 退出账号 -->
                    <div class="list-item">
                        <div class="list-icon">
                            <i class="logout"></i>
                        </div>
                        <div class="list-info no-border-bottom"  @click="exitLogin">
                            <div class="list-name">退出账号</div>
                            <div class="list-opera">
                                <img class="more-link" src="../../assets/img/more-link.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- 退出账号 -->
                </div>
            </div>
        </div>
        <div class="footer">
            <Foot></Foot>
        </div>
    </div>
</template>

<script>
import Head from 'components/common/Head'
import Foot from 'components/common/Foot'

export default {
    data() {
        return {
            title: '个人中心',
            editUserInfo: true, // 控制修改和保存按钮的显示和隐藏
            username: ''
        }
    },
    components: {
        Head,Foot
    },
    methods: {
        // 修改用户名存本地localStorage
        changeUserInfoState() {
            // 保存
            if(!this.editUserInfo) {
                localStorage.setItem('username',this.username);
            }
            this.editUserInfo = !this.editUserInfo;
        },
        // 退出登录
        exitLogin() {
            localStorage.removeItem('username');
            this.$router.replace('/home');
        }
    },
    created() {
        this.username =  localStorage.getItem('username');  // 从localStorage中取用户名
    }
}
</script>


<style lang="stylus" scoped>
.personal
    height: 100%
    background: #f0f0f3
    display: flex
    flex-flow: column
    .header
        height: .44rem
    .content
        margin-top: .44rem
        // 用户信息
        .user
            height: .72rem
            padding: .16rem
            background: #fff
            box-sizing: border-box
            display: flex
            align-items: center
            .user-info
                flex: 1
                display: flex
                .user-icon
                    width: .4rem
                    height: .4rem
                    border: 1px solid rgba(153,153,153,.3)
                    border-radius: 50%
                    overflow: hidden
                    img
                        width: 100%
                        height: 100%
                .user-name
                    font-size: .16rem
                    width: 1.25rem
                    height: 0.4rem
                    margin-left: .16rem
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
                    word-break: break-all
                    display: flex
                    flex-flow: column
                    div
                        height: .2rem
                        line-height: .2rem
                    .user-id
                        color: #999;
                        font-size: .12rem;
                .user-edit
                    input
                        width: 1rema
                        font-size: .16rem
                        border-bottom: 1px solid rgba(153,153,153,.3);
            .u-btn
                width: .56rem
                height: .24rem
                text-align: center
                border-radius: .025rem
                display: inline-block
                padding: 0 .1rem
                border: 1px solid #e6e7ed
                color: #333
                font-size: .12rem
                background-color: #e6e7ed
        // 列表项
        .list-block
            margin-top: .08rem
            background: #fff
            .list-item
                height: 0.56rem
                line-height: 0.56rem
                padding: 0 0 0 .16rem
                display: flex
                align-items: center
                // 列表项图标
                .list-icon
                    width: .24rem
                    height: .24rem
                    line-height: .24rem
                    overflow: hidden
                    i
                        display: inline-block
                        width: 100%
                        height: 100%
                        background-repeat: no-repeat
                        background-size: 100%
                        background-position: center
                        &.wallet
                            background-size: 0.19rem 0.16rem
                            background-image: url(../../assets/img/wallet.png)
                        &.bean
                            background-size: 0.19rem 0.19rem
                            background-image: url(../../assets/img/bean.png)
                        &.clock
                            background-image: url(../../assets/img/clock.png)
                        &.ubook
                            background-image: url(../../assets/img/ubook.png)
                        &.shelf
                            background-size: .16rem .17rem
                            background-image: url(../../assets/img/shelf.png)
                        &.clocked
                            background-image: url(../../assets/img/clocked.png)
                        &.logout
                            background-image: url(../../assets/img/logout.png)
                // 列表项信息
                .list-info
                    height: 100%
                    flex: 1
                    display: flex
                    margin-left: .16rem
                    border-bottom: 1px solid rgba(153,153,153,.3)
                    // 没有下边框
                    &.no-border-bottom
                        border-bottom: 0
                    // 列表项主题
                    .list-name
                        flex: 1
                    // 列表项操作
                    .list-opera
                        margin-right: .16rem
                        font-size: .14rem
                        color: #999
                        button
                            width: 0.56rem
                            height: .25rem
                            line-height: .24rem
                            font-size: .12rem
                            border-radius: 0.04rem
                        .button-fill
                            background: #00c98d
                            color: #fff
                        .more-link
                            height: .16rem
                            margin-top: .19rem
                
</style>
