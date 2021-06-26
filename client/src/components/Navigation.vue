<template>
  <header>
    <div class="branding">
      <font-icon icon="file-invoice" />
    </div>
    <div class="right">
      <ToggleMode />
      <img :src="user.photoURL" :alt="user.name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import ToggleMode from './ToggleMode.vue';

export default {
  name: 'Navigation',
  components: {
    ToggleMode,
  },
  computed: {
    ...mapState('user', ['user']),
  },
  created() {
    console.log(this.user);
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  z-index: 99;
  background-color: #1e2139;
  justify-content: space-between;

  @media screen and (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background: #7c5bfa;
    display: flex;
    justify-content: center;
    padding: 24px;

    @media screen and (min-width: 900px) {
      width: 100%;
    }

    svg {
      width: auto;
      height: 30px;
      color: #f4f4f4;
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
    align-items: center;

    img {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      margin-left: 1rem;
    }

    @media screen and (min-width: 900px) {
      flex-direction: column;
      padding-right: 0;
      padding-bottom: 1rem;

      img {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
}
</style>
