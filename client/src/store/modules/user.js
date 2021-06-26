// import router from '@/router';
import { getUserRequest, logInRequest, signUpRequest } from '../../api/users';

// initial state
const initialState = {
  loading: true,
  user: null,
};

// getters
const getters = {};

// actions
const actions = {
  // getAllProducts({ commit }) {
  //   shop.getProducts((products) => {
  //     commit('setProducts', products);
  //   });
  // },
  async loginUser({ commit }, data) {
    try {
      // console.log(router);
      const res = await logInRequest(data);
      commit('setUser', res.data);
      localStorage.setItem('vkt', res.data.token);
      // router.push('/');
      this.$router.push('/');
    } catch (err) {
      console.log(err);
      commit('unsetUser');
    }
  },
  async registerUser({ commit }, data) {
    try {
      const res = await signUpRequest(data);
      commit('setUser', res.data);
      localStorage.setItem('vkt', res.data.token);
    } catch (err) {
      console.log(err);
      commit('unsetUser');
    }
  },
  async getUser({ commit }) {
    try {
      const res = await getUserRequest();
      console.log({ res });
      commit('setUser', res.data);
      localStorage.setItem('vkt', res.data.token);
    } catch (err) {
      console.log(err.response.data);
      console.log(err);
      commit('unsetUser');
    }
  },
};

// mutations
const mutations = {
  // setProducts(state, products) {
  //   state.all = products;
  // },
  // decrementProductInventory(state, { id }) {
  //   const product = state.all.find((product) => product.id === id);
  //   product.inventory--;
  // },
  setUser(state, user) {
    state.loading = false;
    state.user = user;
  },
  unsetUser(state) {
    state.loading = false;
    state.user = null;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
