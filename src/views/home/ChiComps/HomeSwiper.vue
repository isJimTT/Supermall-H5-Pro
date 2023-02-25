<template>
   <swiper >
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link"></a>
        <img :src="item.image" alt="">
      </swiper-item>
    </swiper>
</template>

<script>

  import {Swiper, SwiperItem} from 'components/common/swiper'


export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>

</style>
