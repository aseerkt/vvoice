<template>
  <div class="toggle">
    <font-icon @click="toggleMode" v-if="toggle === 'light'" icon="moon" />
    <font-icon @click="toggleMode" v-if="toggle === 'dark'" icon="sun" />
  </div>
</template>

<script>
export default {
  name: 'ToggleMode',
  data() {
    return {
      toggle: 'dark',
    };
  },
  methods: {
    toggleMode() {
      this.toggle = this.toggle === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.toggle);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.toggle {
  display: grid;
  place-items: center;
  border-right: 1px solid #494e6e;
  height: 100%;

  svg {
    cursor: pointer;
    height: 1.6rem;
    width: 1.6rem;
    margin-right: 1rem;
    color: rgba(255, 255, 255, 0.5);
  }
  @media screen and (min-width: 900px) {
    border-bottom: 1px solid #494e6e;
    border-right: none;
    width: 100%;

    svg {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
}
</style>
