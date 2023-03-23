import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECKED,
  CHECK_ALL_TO
} from "./mutation-type"

export default {
  addCart(context, payload) {

    // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断oldProduct
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  },
  check(context, payload) {
    for (let i = 0; i < context.state.cartList.length; i++) {
      if (context.state.cartList[i].iid === payload.iid) {
        context.commit(CHANGE_CHECKED, context.state.cartList[i])
      }
    }
  },
  checkAll(context, payload) {
    for (let i = 0; i < context.state.cartList.length; i++) {
      context.commit(CHECK_ALL_TO, {
        item: context.state.cartList[i],
        check: payload
      })
    }
  }
}
