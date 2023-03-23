<template>
  <div class="content">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <cart-list :goodsList="cartList"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>

  import { mapGetters } from 'vuex';


  import NavBar from '@/components/common/navbar/NavBar.vue';
  import CartList from "./components/CartList.vue"
  import CartBottomBar from './components/CartBottomBar.vue'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: 'cartListLength',
      cartList: 'cartList'
    })
  }
}
</script>

<style lang="less" scoped>

  .content {
    height: 100vh;
    .nav-bar {
      background-color: #ff8f96;
    }
  }

</style>
