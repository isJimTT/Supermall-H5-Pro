<template>
  <div>
    <nav-bar>
      <div slot="left" class="img" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in title"
          :key="index"
          class="titleItem"
          :class="{active: currentIndex=== index}"
          @click="titleClick(index)">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'

export default {
  data() {
    return {
      title: ['商品', "参数", "评论", "推荐"],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .titleItem {
    flex: 1;
  }
  .img {
    margin-top: 7px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
