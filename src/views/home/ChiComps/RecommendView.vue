<template>
  <div class="recommend" >
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
    .recommend-item {
      flex: 1;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
</style>
