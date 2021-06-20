import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './config/font-awesome';

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
