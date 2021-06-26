<template>
  <div class="container home">
    <!-- Header -->
    <header>
      <div class="left">
        <h1>Invoices</h1>
        <span>There are 4 total invoices</span>
      </div>
      <div class="right">
        <div class="filter" @blur="hideFilterMenu" @click="toggleFilterMenu">
          <span>Filter by status</span>
          <font-icon icon="chevron-down" />
          <ul v-show="filterMenu" class="filter-menu">
            <li>Draft</li>
            <li>Pending</li>
            <li>Paid</li>
            <li>Clear Filter</li>
          </ul>
        </div>
        <div class="button" @click="newInvoice">
          <div class="inner-buttons">
            <font-icon icon="plus" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      filterMenu: null,
    };
  },
  methods: {
    ...mapMutations('invoice', ['toggleInvoice']),
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    hideFilterMenu() {
      this.filterMenu = false;
    },
    newInvoice() {
      this.toggleInvoice();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
}

header {
  display: flex;
  margin-bottom: 65px;
}

.left,
.right {
  flex: 1;
}

.left {
  display: flex;
  flex-direction: column;
}

.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .filter,
  .button {
    align-items: center;

    span {
      font-size: 12px;
    }
  }

  .filter {
    display: flex;
    position: relative;
    margin-right: 40px;
    cursor: pointer;

    span,
    svg {
      pointer-events: none;
    }

    svg {
      color: #3535f8;
      margin-left: 12px;
      width: 1rem;
      height: 1rem;
    }

    .filter-menu {
      width: 120px;
      position: absolute;
      top: 25px;
      list-style: none;
      background-color: #1e2139;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

      li {
        cursor: pointer;
        font-size: 12px;
        padding: 10px 20px;
        user-select: none;

        &:hover {
          color: #1e2139;
          background-color: #fff;
        }
      }
    }
  }

  .button {
    display: flex;
    padding: 8px 10px;
    background-color: #7c5dfa;
    border-radius: 40px;

    .inner-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
      border-radius: 50%;
      padding: 8px;
      background-color: #fff;

      svg {
        color: #7c5dfa;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
</style>
