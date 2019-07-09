<template>
  <!-- 这是总分类组件 -->
  <div class="category">
    <Head :title="title"></Head>
    <div class="content">
      <!-- 分类 开始 -->
      <div
        class="sex-category"
        v-for="(category,sexIndex) in categorys"
        :key="sexIndex"
      >
        <dl>
          <dt class="title">{{ sexIndex === 'girl'?'女生分类':'男生分类' }}</dt>
          <dd v-for="(item,index) in category" :key="index">
            <router-link
                :to="{
                        name:'nav',
                        params: {
                            id: item[Object.keys(item)[0]].cid
                        },
                        query: {
                            cid: item[Object.keys(item)[0]].cid,
                            title: Object.keys(item)[0],
                            relatedName: item[Object.keys(item)].relatedName
                        }
                    }"
            >
              <div class="left" :style="sexIndex === 'girl'?sprite(index):sprite(index+4)"></div>
              <div class="right">
                <div class="caption">{{ Object.keys(item)[0] }}</div>
                <div class="detail">
                    <ul>
                        <li
                            v-for="(detail,index) in item[Object.keys(item)[0]].list"
                            :key="index"
                        >
                            <span> {{ index===0?'':'|' }} {{ detail }} </span>
                        </li>
                    </ul>
                </div>
              </div>
            </router-link>
          </dd>
        </dl>
      </div>
      <!-- 分类 结束 -->
    </div>
  </div>
</template>


<script>
import Head from 'components/common/Head'
import { mapActions,mapGetters } from 'vuex'

export default {
  // 数据
  data() {
    return {
      title: "分类",
    };
  },
  created() {
      // 请求数据
      this.getCategorys();
  },
  components: {
    Head
  },
  methods: {
    // 数据请求辅助工具
    ...mapActions(['getCategorys'])
  },
  computed: {
    // 数据获取辅助工具
    ...mapGetters(['get_category_data']),
    categorys() {
      return this.get_category_data && this.get_category_data;
    },
    // 精灵图定位（闭包）
    sprite() {
      return function(index) {
        return `background-position: 0 ${index*-0.485}rem`;
      }
    }
  }
};
</script>

<style scoped>
/* 分类大盒子 */
.category {
  padding-top: 0.44rem;
  font-size: 0.12rem;
  background: #fafafa;
}

/* 标题 */
.sex-category dt {
  font-size: 0.12rem;
  padding: 0.14rem 0 0.1rem 0.16rem;
  color: #999;
}

/* 性别分类中的所有具体分类 */
.sex-category dd {
  background-color: #fff;
  position: relative;
}

/* 分隔线 */
.sex-category dd::after {
    display: block;
    content: " ";
    position: absolute;
    height: 1px;
    bottom: 0;
    background-color: #f3f3f3;
    right: 0;
    left: .16rem;
}

/* 每一个具体分类 */
.sex-category dd a {
  display: flex;
  padding: 0.13rem 0.16rem;
  padding-right: 0;
}

/* 左边精灵图 */
.category dd .left {
  width: 0.36rem;
  height: 0.36rem;
  background: url(../../assets/img/category-sprite.png) no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100%;
  margin-right: 0.1rem;
}

/* 右边标题 */
.category dd .right .caption {
    color: #333;
    font-size: .14rem;
    margin-bottom: .06rem;
    margin-top: .05rem;
}

/* 右边详细二级分类 */
.category dd .right .detail ul {
    display: flex;
}

.category dd .right .detail ul li {
    font-size: 0.12rem;
    color: #999;
    margin-right: 2px;
}
</style>