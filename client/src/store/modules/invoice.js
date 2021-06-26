const initialState = {
  invoiceModal: false,
  data: [],
  loading: true,
};

const getters = {};

const actions = {
  // async addInvoice({ commit }, data) {
  //   try {
  //     const res = await addInvoiceRequest(data);
  //     commit('insertInvoice', res.data);
  //   } catch (err) {}
  // },
  // getInvoices() {},
};

const mutations = {
  toggleInvoice(state) {
    state.invoiceModal = !state.invoiceModal;
  },
  insertInvoice(state, data) {
    state.data = state.data.concat(data);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
