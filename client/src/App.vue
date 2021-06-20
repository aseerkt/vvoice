<template>
  <div v-if="!mobile" class="app">
    <Navigation />
    <div class="app-content">
      <transition name="invoice">
        <InvoiceModal v-if="invoiceModal" />
      </transition>
      <router-view />
    </div>
  </div>
  <div v-else class="mobile-message">
    <h2>Sorry this app is not mobile supported</h2>
    <p>To use this app, please use computer or tablet</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from './components/Navigation.vue';
import InvoiceModal from './components/InvoiceModal.vue';

export default {
  data() {
    return {
      mobile: null,
    };
  },
  components: {
    Navigation,
    InvoiceModal,
  },
  created() {
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen());
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
      }
      this.mobile = false;
    },
  },
  computed: {
    ...mapState(['invoiceModal']),
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app {
  display: flex;
  flex-direction: column;
  background: #141625;
  min-height: 100vh;

  @media screen and (min-width: 900px) {
    flex-direction: row;
  }

  .app-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 20px;
    position: relative;
  }
}

.mobile-message {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #141625;
  color: #fff;

  p {
    margin-top: 16px;
  }
}

/* animated invoice */

.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-100%);
}

/* Utilities */

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}
</style>
