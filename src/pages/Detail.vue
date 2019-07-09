<template>
    <div class="detail">
        <Head :title="title"></Head>
        <div class="content">
            Detail
        </div>
    </div>
</template>

<script>
import Head from 'components/common/Head'

export default {
    data() {
        return {
            title: '书籍详情'
        }
    },
    components: {
        Head
    }
}
</script>

<style lang="stylus" scoped>
.content
    padding-top: 0.44rem
</style>
