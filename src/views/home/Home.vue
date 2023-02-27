<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners = "banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']"
    class="tab-control" @tabClick = tabClick></tab-control>
    <goods-list :goods = "showGoods"></goods-list>
  </div>
</template>

<script>

  import HomeSwiper from "./ChiComps/HomeSwiper.vue";
  import RecommendView from './ChiComps/RecommendView.vue';
  import FeatureView from './ChiComps/FeatureView.vue';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/tabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import { getHomeMultidata, getHomeGoods } from 'network/home/';

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
      currentType: 'pop'
    }
  },
  components: {

    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList
  },
  created() {
    // 1.请求recommend和banner数据
    this.getHomeMultidata()

    // 2.请求Goods数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
      })
    }
  }

}
</script>

<style scoped>
#home {
  height: 2000px;
  padding-top: 44px;
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
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
    background-color: #fff;
  }
</style>
