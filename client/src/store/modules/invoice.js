const initialState = {
  invoiceModal: false,
};

const getters = {};

const actions = {};

const mutations = {
  toggleInvoice(state) {
    state.invoiceModal = !state.invoiceModal;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
