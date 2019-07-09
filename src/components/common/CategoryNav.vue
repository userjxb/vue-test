<template>
    <div class="tags">
        <ul>
            <template v-for="items in list">
                <template v-for="item in items.class">
                    <li
                        :class="[{ active: (item.id === activeId) || (item.id == 11 && firstActive)}]"
                        :key='item.id'
                        @click="changeActive(
                            {
                                id: item.id,
                                secondCate: item.relatedName,
                            })"
                    >
                        {{ item.name }}
                    </li>
                </template>
                <template v-for="item in items.tag">
                    <li
                        :class="[{ active: (item.id === activeId) || (items.id%10 == 1 && firstActive)}]"
                        :key='item.id'
                        @click="changeActive({
                                id: item.id,
                                tag: item.name
                            })"
                    >
                        {{ item.name }}
                    </li>
                </template>
                <template>
                    <li
                        v-if = 'items.id'
                        :class="[{ active: (items.id === activeId) || (items.id%10 == 1 && firstActive)}]"
                        :key="items.id"
                        @click="changeActive({
                                    id: items.id,
                                    words: items.words,
                                    sort: items.sort,
                                    status: items.status
                                })"
                    >
                        {{ items.text }}
                    </li>
                </template>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    
    props: ['list'],

    data () {
        return {
            activeId: 0,
            firstActive: true,
        }
    },
    
    methods: {
        changeActive(options) {
            this.activeId = options.id;
            this.firstActive = false;
            
            this.$emit('test',options);
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylesheets/variable.styl'
.tags
    padding-left: .16rem
    background-color: #fff
    color: #888
    ul
        font-size: .14rem
        border-bottom: 1px solid #f3f3f3
        -webkit-flex-wrap: wrap
        flex-wrap: wrap
        padding-top: .12rem
        li
            display: inline-block
            margin-bottom: .12rem
            margin-right: .28rem
            color: #33
            &.active
                color: activeColor
</style>
