<template>
  <div class="content">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from '@/components/common/navbar/NavBar.vue';

export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style lang="less" scoped>

  .content {
    .nav-bar {
      background-color: #ff8f96;
    }
  }

</style>
