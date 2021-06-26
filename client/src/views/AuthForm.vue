<template>
  <div class="container">
    <form @submit="submitForm">
      <h1>
        {{ page == 'signup' ? 'Sign Up' : 'Log In' }}
      </h1>
      <div v-if="page == 'signup'" class="input">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="input">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">
        {{ page == 'signup' ? 'Sign Up' : 'Log In' }}
      </button>
    </form>
    <footer>
      <small v-if="page == 'login'">
        Don't have an account?
        <router-link :to="{ name: 'Auth', params: { page: 'signup' } }">Sign Up</router-link>
      </small>
      <small v-if="page == 'signup'">
        Already have an account?
        <router-link :to="{ name: 'Auth', params: { page: 'login' } }">Log In</router-link>
      </small>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import { logInRequest, signUpRequest } from '../api/users';

export default {
  name: 'AuthForm',
  data() {
    return {
      page: null,
      name: '',
      email: '',
      password: '',
    };
  },
  created() {
    this.page = this.$route.params.page;
    // console.log(this.page);
    this.$watch(
      () => this.$route.params,
      (toParams) => {
        // console.log(toParams);
        this.page = toParams.page;
      },
    );
  },
  methods: {
    ...mapActions('user', ['registerUser', 'loginUser']),
    async submitForm() {
      if (!this.email || !this.password || (this.page === 'login' ? false : !this.name)) {
        // eslint-disable-next-line
        alert('fill in the fields');
      }
      if (this.page === 'login') {
        // Login
        console.log(this.loginUser);
        await this.loginUser({
          email: this.email,
          password: this.password,
        });
        // const res = await logInRequest({
        //   email: this.email,
        //   password: this.password,
        // });
        // console.log(res);
      } else {
        console.log(this.registerUser);
        await this.registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        // Sign Up
        // const res = await signUpRequest({
        //   name: this.name,
        //   email: this.email,
        //   password: this.password,
        // });
        // console.log(res);
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 1rem auto;
  color: #fff;

  form {
    width: 100%;

    h1 {
      margin-bottom: 2rem;
    }

    button {
      background-color: #7c5dfa;
    }
  }

  footer {
    margin-top: 2rem;
    a {
      text-decoration: none;
      color: #7c5dfa;
    }
  }
}
</style>
