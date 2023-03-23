import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECKED,
  CHECK_ALL_TO
} from "./mutation-type"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state, payload) {
    payload.checked = !payload.checked
  },
  [CHECK_ALL_TO](state, payload) {
    payload.item.checked = payload.check
  }
}
