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
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle {
  display: grid;
  place-items: center;
  border-right: 1px solid lightgray;
  height: 100%;

  svg {
    cursor: pointer;
    height: 1.6rem;
    width: 1.6rem;
    margin-right: 1rem;
    color: #fff;
  }
  @media screen and (min-width: 900px) {
    border-bottom: 1px solid whitesmoke;
    border-right: none;
    width: 100%;

    svg {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
}
</style>
