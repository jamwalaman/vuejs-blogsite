import Vue from 'vue'
import VueRouter from 'vue-router'

import * as auth from '../services/AuthService'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import(/* webpackChunkName: "bloglist" */ '../views/AllBlogs.vue')
  },
  {
    path: '/blog/:id',
    component: () => import(/* webpackChunkName: "empty" */ '../views/Empty.vue'), // from https://dev.to/berniwittmann/my-approach-on-vue-router-architecture-and-nested-routes-2kmo
    // Sub routes
    children: [{
        path: '', // '/blog/:id'
        name: 'blogread',
        component: () => import(/* webpackChunkName: "blogread" */ '../views/BlogRead.vue')
      },
      {
        path: 'update', // '/blog/:id/update'
        name: 'blogupdate',
        component: () => import(/* webpackChunkName: "blogupdate" */ '../views/BlogUpdate.vue')
      }
    ]
  },
  {
    path: '/create',
    name: 'blogcreate',
    component: () => import(/* webpackChunkName: "blogcreate" */ '../views/BlogCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/UserLogin.vue'),
    // If a logged in user tries to go to the Login page, redirect them to home
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '../views/UserRegister.vue'),
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    }
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  /* eslint-disable no-unused-vars */
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  /* eslint-enable no-unused-vars */
  routes
})

export default router
