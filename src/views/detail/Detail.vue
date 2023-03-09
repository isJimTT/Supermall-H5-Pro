<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :detailSwiper="detailSwiper"/>
      <detail-base-info :info="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"  @loadFinish="loadFinish"/>
      <detail-goods-params :goods-params="goodsParams" />
      <detail-goods-comments :rates="rates" />
      <goods-list :goods="recommends" />
    </scroll>
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

import Scroll from '@/components/common/scroll/Scroll.vue'

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail.js'
import { itemListenerMixin } from 'common/mixins.js'

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
      recommends: []
    }
  },
  methods: {
    // 照片加载完成，刷新重新计算高度
    loadFinish() {
      this.$refs.scroll.itemImageRefresh()
    }
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mixins: [itemListenerMixin],
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
    height: calc(100% - 44px);
  }
</style>
