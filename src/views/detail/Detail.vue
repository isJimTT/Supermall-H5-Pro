<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :detailSwiper="detailSwiper"></detail-swiper>
    <detail-base-info :info="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
import detailNavBar from './childComps/detailNavBar'
import DetailSwiper from './childComps/detailSwiper.vue'
import {getDetail, Goods, Shop} from 'network/detail.js'
import DetailBaseInfo from './childComps/detailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
export default {
  name:"Detail",
  components: {
    detailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      detailSwiper: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    // 1.保存商品id
    this.iid = this.$route.params.iid

    // 2.获取detail数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 轮播图数据
      this.detailSwiper = res.result.itemInfo.topImages

      // 商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 商家信息
      this.shop = new Shop(data.shopInfo)
    })
  }
}
</script>

<style>

</style>
