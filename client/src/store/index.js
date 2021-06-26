import { createStore, createLogger } from 'vuex';
import user from './modules/user';
import alert from './modules/alert';
import invoice from './modules/invoice';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    alert,
    invoice,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
