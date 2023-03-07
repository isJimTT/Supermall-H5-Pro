<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

export default {
  data() {
    return {
      scroll: null,

    }
  },
  props: {
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
  },
  mounted() {
    // 1.创建scroll事件
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    // 2.监听滚动事件
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    backTopClick(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    itemImageRefresh() {
      // console.log("---------");
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>
