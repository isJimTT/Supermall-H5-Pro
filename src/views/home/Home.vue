<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行', '新款', '精选']"
      @tabClick = tabClick
      ref="tabControl1"
      class="fixed"
      v-show="isTabFixed"
      ></tab-control>

    <scroll class="content"
    ref = "scroll"
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="pullLoadMore">
      <home-swiper :banners = "banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
      @tabClick = tabClick
      ref="tabControl2"
      ></tab-control>
      <goods-list :goods = "showGoods"></goods-list>
    </scroll>

    <back-top @click.native = backTopClick v-show="isShow"></back-top>

  </div>
</template>

<script>

  import HomeSwiper from "./ChiComps/HomeSwiper.vue";
  import RecommendView from './ChiComps/RecommendView.vue';
  import FeatureView from './ChiComps/FeatureView.vue';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/tabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from "components/common/scroll/Scroll.vue";
  import BackTop from "components/content/backTop/BackTop.vue"

  import { getHomeMultidata, getHomeGoods } from 'network/home/';
  import { debounce } from "common/utils";
import { onDeactivated } from "vue";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {

    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 1.请求recommend和banner数据
    this.getHomeMultidata()

    // 2.请求Goods数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.itemImageRefresh, 500)

    this.$bus.$on('ImageLoad', () => {
      refresh()
    })
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()

  },
  Deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关
     *  */
    tabClick(index) {
      switch(index) {
        case 0: this.currentType = 'pop'
         break
        case 1: this.currentType = 'new'
         break
        case 2: this.currentType = 'sell'
         break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTopClick() {
      this.$refs.scroll.backTopClick(0, 0, 500)
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShow = -(position.y) > 1000

      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    pullLoadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关
     *  */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
    })
    },

    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }

}
</script>

<style scoped>
#home {
  height: 100vh;
  padding-top: 44px;
  position: relative;
}
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .fixed {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
