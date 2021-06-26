import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import AuthForm from '../views/AuthForm.vue';

const routes = [
  {
    path: '/auth/:page',
    name: 'Auth',
    component: AuthForm,
    meta: {
      guest: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '*',
  //   redirect: '/',
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('vtk') == null) {
      next({
        name: 'Auth',
        replace: true,
        params: { nextUrl: to.fullPath, page: 'login' },
      });
    } else {
      // const store = this.$store;
      const { loading } = store.state.user;
      console.log(loading);

      if (loading) {
        await store.dispatch('user/getUser');
      }
      const { user } = store.state.user;
      if (user) {
        next();
      } else {
        next({
          name: 'Auth',
          replace: true,
          params: { nextUrl: to.fullPath, page: 'login' },
        });
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('vtk') == null) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router;
