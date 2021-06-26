import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import '@/config/font-awesome';
import { BASE_URL, TOKEN_NAME } from '@/config/constants';
import App from './App.vue';
import router from './router';
import store from './store';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`,
};

createApp(App)
  // Click away listener directive
  .directive('click-outside', {
    bind() {
      this.event = (event) => this.vm.$emit(this.expression, event);
      this.el.addEventListener('click', this.stopProp);
      document.body.addEventListener('click', this.event);
    },
    unbind() {
      this.el.removeEventListener('click', this.stopProp);
      document.body.removeEventListener('click', this.event);
    },

    stopProp(event) {
      event.stopPropagation();
    },
  })
  .component('font-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
