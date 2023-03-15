<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :detailSwiper="detailSwiper"/>
      <detail-base-info :info="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"  @loadFinish="loadFinish"/>
      <detail-goods-params :goods-params="goodsParams" ref="params"/>
      <detail-goods-comments :rates="rates" ref="comments"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native = backTopClick v-show="isShow"></back-top>

  </div>
</template>

<script>
import detailNavBar from './childComps/detailNavBar'
import DetailSwiper from './childComps/detailSwiper.vue'
import DetailBaseInfo from './childComps/detailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailGoodsParams from './childComps/DetailGoodsParams.vue'
import DetailGoodsComments from './childComps/DetailGoodsComments.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from '@/components/common/scroll/Scroll.vue'

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail.js'
import { itemListenerMixin, backTopMixin } from 'common/mixins.js'

export default {
  name:"Detail",
  components: {
    detailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailGoodsComments,
    GoodsList,
    DetailBottomBar,

    Scroll
  },
  data() {
    return {
      iid: null,
      detailSwiper: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      rates: {},
      recommends: [],
      NavTopY:[],
      currentIndex: null
    }
  },
  methods: {
    // 照片加载完成，刷新重新计算高度
    loadFinish() {
      this.$refs.scroll.itemImageRefresh()
    },
    // 监听navbar点击
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.backTopClick(0, -this.NavTopY[index], 200)
    },
    // 监听屏幕滚动
    contentScroll(position) {
      const positionY = -position.y
      let length = this.NavTopY.length
      for(let i = 0; i < length - 1; i ++) {
        if(this.currentIndex !== i && (positionY >= this.NavTopY[i] && positionY < this.NavTopY[i+1]))
        this.currentIndex = i
        this.$refs.nav.currentIndex = this.currentIndex
      }

      // 1.判断backTop是否显示
      this.isShowBackTop(position)
    },

  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1.保存商品id
    this.iid = this.$route.params.iid

    // 2.获取detail数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 轮播图数据
      this.detailSwiper = data.itemInfo.topImages

      // 商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 商家信息
      this.shop = new Shop(data.shopInfo)

      // 商品详情信息
      this.detailInfo = data.detailInfo

      // 商品参数信息
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)

      // 商品评论信息
      this.rates = data.rate


    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })


  },
  mounted() {

    // 获取NavTop值
      setTimeout(() => {
        this.NavTopY = []
        this.NavTopY.push(0)
        this.NavTopY.push(this.$refs.params.$el.offsetTop)
        this.NavTopY.push(this.$refs.comments.$el.offsetTop)
        this.NavTopY.push(this.$refs.recommends.$el.offsetTop)
        this.NavTopY.push(Number.MAX_VALUE)
        console.log(this.NavTopY)
      }, 2000);
  }

}
</script>

<style scoped>
  .detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
