<template>
   <swiper >
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link"></a>
        <img :src="item.image" alt="" @load="imgLoad">
      </swiper-item>
    </swiper>
</template>

<script>

  import {Swiper, SwiperItem} from 'components/common/swiper'


export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
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
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
        }
      }
    }

  }
</script>

<style>

</style>
