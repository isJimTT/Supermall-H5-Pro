import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop.vue"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.itemImageRefresh, 500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,

    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.backTopClick(0, 0, 500)
    },
    isShowBackTop(position) {
      this.isShow = -(position.y) > 1000
      console.log(this.isShow)
    }
  }
}
