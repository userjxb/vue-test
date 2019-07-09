<template>
    <div class="fictions-list">
        <ul>
            <router-link
                tag = "li"
                v-for = "(fiction,index) in fictions"
                :key = "index"
                :to = "{name: 'detail' }"
            >
                <a href="#">
                    <div class="item">
                        <div class="fiction-img">
                            <img :src="fiction.cover" alt="">
                        </div>
                        <div class="fiction-info">
                            <h3> {{ fiction.title }} </h3>
                            <p> {{ fiction.author }} </p>
                            <p class="text">
                                {{ fiction.desc }}
                            </p>
                            <div class="book-tag">
                                <span :class="fiction.status===1?'wj':'lz'">{{ fiction.status===1?'完结':'连载' }}</span>
                                <span> {{ fiction.words | wordsCount }} </span>
                                <span>{{ returnTags(fiction.tags)[0] }}</span>
                                <span>{{ returnTags(fiction.tags)[1] }}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </router-link>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props: ['fictions'],
    filters: {
        // 有多少万字
        wordsCount(num) {
            return parseInt(num/10000) + '万字';
        }
    },
    computed: {
        // 返回标签数组
        returnTags() {
            return function(tag) {
                let tagArr = tag.split(',');
                return tagArr;
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'
// 小说列表
.fictions-list
    margin-top: 0.06rem
    background: #fff
    li
        a:hover
            text-decoration: none
        a
            display: block
            padding-left: .16rem
            .item
                padding: .2rem .16rem .2rem 0
                border-bottom: 1px solid #f3f3f3
                display flex
                .fiction-img
                    margin-right: .16rem
                    width: .84rem
                    height: 1.12rem
                    position: relative
                    overflow: hidden
                    background: url(http://c-shuqi.11222.cn/assets/default-book_8d24e62.jpg)
                    background-size: .84rem 1.12rem
                    img
                        width: .84rem
                        height: 1.12rem
                .fiction-info
                    width: 2.43rem
                    h3
                        color: #333
                        font-size: .16rem
                        line-height: .18rem
                        overflow: hidden
                        white-space: nowrap
                        text-overflow: ellipsis
                        word-break: break-all
                    p
                        font-size: .12rem
                        color: #999
                        line-height: .16rem
                        display: -webkit-box
                        overflow: hidden
                        text-overflow: ellipsis
                        -webkit-box-orient: vertical
                        -webkit-line-clamp: 2
                        margin-top: .08rem
                        max-height: 100%
                    .text
                        height: .36rem
                        line-height: .18rem
                    .book-tag
                        margin-top: .08rem
                        overflow: hidden
                        height: .19rem
                        .wj
                            color: wjColor
                            border-color: wjBorderColor
                        .lz
                            color: lzColor
                            border-color: lzBorderColor
                        span
                            font-size: .1rem
                            height: .17rem
                            line-height: .18rem
                            border: 1px solid rgba(153,153,153,.3)
                            border-radius: .02rem
                            padding: 0 .06rem
                            margin-right: .04rem
                            color: fontColor
                            display: inline-block
</style>
