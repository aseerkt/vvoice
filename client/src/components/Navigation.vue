<template>
  <header>
    <div class="branding">
      <font-icon icon="file-invoice" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  z-index: 99;
  background-color: #1e2139;

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
}
</style>
