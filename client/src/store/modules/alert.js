const initialState = {
  severity: null,
  message: null,
};

const getters = {};

const actions = {};

const mutations = {
  setAlert(state, payload) {
    state.message = payload.message;
    state.severity = payload.severity;
  },
  clearAlert(state) {
    state.message = null;
    state.severity = null;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
