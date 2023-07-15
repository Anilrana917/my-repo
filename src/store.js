import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      myName: "ANilrana",
      cart: [],
    };
  },
  mutations: {
    ADD_TO_CART(state, { product, quantity }) {
      state.cart.push({ product, quantity });
    },
  },
  actions: {},
  getters: {},
});

export default store;
