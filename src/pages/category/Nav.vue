<template>
    <!-- 这是分类详情组件 -->
    <div class="category-detail">
        <!-- 标题 -->
        <div class="title">
            <Head :title="title"></Head>
        </div>
        <div class="easy-nav" v-show="!showNav" @click="changeNavFixed()">
            <span class="active-tag"> {{ classText || tag }} </span>
            <span class="active-word"> {{ tag2Text }} </span>
            <span class="active-state"> {{ tag3Text || (this.status == 2 && '完结')}} </span>
        </div>
        <div class="main" ref="page">
            <div>
                <!-- 头部导航 -->
                <div class="nav" :class="{'fixed': navFixed }" ref="nav">
                    <template v-for="listItem in categoryDetails">
                        <category-nav
                            :list="listItem.item"
                            :key="listItem.key"
                            @test = 'refictions'
                            v-show="showNav"
                        >
                        </category-nav>
                    </template>
                </div>

                <!-- 小说列表组件 -->
                <fiction-list :fictions="fictions"></fiction-list>
            </div>
        </div>
    </div>
</template>

<script>
import Head from 'components/common/Head'
import CategoryNav from 'components/common/CategoryNav'
import FictionList from './FictionList'
import { mapActions,mapGetters } from 'vuex'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
import { async } from 'q';
import { truncate, truncateSync } from 'fs';

export default {
    // 数据
    data() {
        return {
            title: this.$route.query.title, // 当前标题
            secondCate: '',  // 请求的分类
            tag: '',        // 请求的分类
            words: '',      // 字数代码
            sort: 'monthHot',  // 默认最热
            status: '',   // 默认完结
            count: 1,  // 滚动加载计数

            showNav: true, // 切换具体导航/悬浮导航
            navFixed: false, // 切换具体导航定位方式fixed
            scrollY: 0, // 已滑动的长度
            theAll: this.$route.query.relatedName, // 保存刚开始的请求
            classText: ''  // 用来记录点击的分类
        }
    },
    // 组件
    components: {
        Head,CategoryNav,FictionList
    },
    // 选项
    methods: {
        // 数据请求辅助工具
        ...mapActions(['getCategoryDetails','getFictions','loadMoreFictions']),
        // 点击三级分类重新请求数据
        refictions(options) {
            // 记住请求上次请求
            this.secondCate = options.secondCate || this.secondCate;
            this.tag = options.tag || this.tag;
            this.words = options.words || this.words;
            this.sort = options.sort || this.sort;
            this.status = options.status || this.status;

            // 二选一处理
            if(options.secondCate) {
                this.tag = ''
            }
            if(options.tag) {
                this.secondCate = ''
            }
            if(options.words == '') {
                this.words = ''
            }
            if(options.sort) {
                this.status = '';
            }
            if(options.status) {
                this.sort = '';
            }

            // 重新请求数据
            this.getFictions(
                {
                    secondCate: this.secondCate,
                    tag: this.tag,
                    words: this.words,
                    sort: this.sort,
                    status: this.status
                });
            this.count = 1; // 重置count让页面重新可以滑动

            this.classText = this.secondCate;  // 用来记录点击的分类
            this.classText == this.theAll && (this.classText = ''); // 过滤
            this.scroll.scrollTo(0,0,500); // 回到顶部
            this.navFixed = false; // 使具体导航取消fixed定位

            console.log({
                    secondCate: this.secondCate,
                    tag: this.tag,
                    words: this.words,
                    sort: this.sort,
                    status: this.status})
        },
        // 点击悬浮导航条 
        changeNavFixed() {
            this.navFixed = true;  // 使具体导航定位方式为fixed
            this.showNav = true;   // 隐藏悬浮导航
            this.$refs.nav.style.top = (-this.scrollY/100 - 0.06) + 'rem';
        }
    },
    computed: {
        // 数据获取辅助工具
        ...mapGetters(['get_category_detail_data','get_fictions_data']),
        // 导航分类数据
        categoryDetails() {
            return this.get_category_detail_data && this.get_category_detail_data;
        },
        // 小说列表数据
        fictions() {
            return this.get_fictions_data && this.get_fictions_data;
        },
        // 悬浮导航内容
        tag2Text() {
            switch(this.words) {
                case 1:
                    return '20万字';
                    break;
                case 2:
                    return '20-100万字'
                    break;
                case 3:
                    return '100万字以上'
                    break;
                default:
                    return '';
                    break;
            }
        },
        tag3Text() {
            switch(this.sort) {
                case 'monthHot':
                    return '最热'
                    break;
                case 'updateTime':
                    return '最新'
                    break;
                case 2:
                    return '完结'
                    break;
            }
        }
    },
    // 生命周期钩子
    created() {
        this.getCategoryDetails(this.title); // 获取分类导航
        // 获取小说列表
        this.getFictions({
            secondCate: this.theAll,
            tag: this.tag,
            sort: this.sort,
            status: this.status,
            words: this.words
        });
        // 滚动加载
        this.$nextTick( () => {
            this.scroll = new BScroll( this.$refs.page,{
                pullUpLoad: {
                    threshold: 50 //开启上拉事件
                },
                click: true,
                mouseWheel: true
            })
            // 滚动事件
            this.scroll.on('scroll',() => {
                this.showNav = this.scroll.y <= -100 ? false : true; // 滑动显示悬浮导航条
                this.scrollY = this.scroll.y; // 保存当前滑动距离
                this.navFixed = false;  // 使具体导航不固定
            });
            this.scroll.on('pullingUp', async () => {
                this.count ++;
                // 最多滑10页
                if(this.count <= 10) {
                    await this.loadMoreFictions({
                        page: this.count,
                        secondCate: this.secondCate,
                        tag: this.tag,
                        sort: this.sort,
                        status: this.status,
                        words: this.words
                    });
                    this.scroll.finishPullUp();
                }else {
                    Toast({
                        message: '没有了...',
                        position: 'center',
                        duration: 2000
                    });
                    this.scroll.finishPullUp();
                    return
                }
            })
        })
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'
// 整个分类
.category-detail
    height: 100%
    display: flex
    flex-flow: column
// 标题
.title
    height: 0.44rem
// 主要内容区
.main
    overflow: hidden
    flex: 1
    background: bgColor
    .fixed
        position: fixed
        top: 0
        left: 0
        z-index: 1000
// 头部导航
.easy-nav
    background-color: #fff
    color: themeColor
    font-size: .14rem
    width: 100%
    height: .44rem
    display: flex
    justify-content: center
    align-items: center
    border-top: 1px solid #f3f3f3
    border-bottom: 1px solid #f3f3f3
    left: 0
    top: 0.44rem
    z-index: 1000
    span
        margin: 0 0.02rem
    &::after
        content: ''
        display: inline-block
        width: .1rem
        height: .1rem
        margin-left: .04rem
        margin-top: .04rem
        background: url(../../assets/img/arrow.png) no-repeat
        background-size: 100%
</style>

