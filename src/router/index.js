import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Blogs
import AllBlogs from '../views/AllBlogs.vue'
import BlogRead from '../views/BlogRead.vue'
import BlogCreate from '../views/BlogCreate.vue'
import BlogUpdate from '../views/BlogUpdate.vue'
// Users
import UserLogin from '../views/UserLogin.vue'
import UserRegister from '../views/UserRegister.vue'
import * as auth from '../services/AuthService'
// Test
import Empty from '../views/Empty.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: AllBlogs
  },
  {
    path: '/blog/:id',
    component: Empty, // from https://dev.to/berniwittmann/my-approach-on-vue-router-architecture-and-nested-routes-2kmo
    // Sub routes
    children: [{
        path: '', // '/blog/:id'
        name: 'blogread',
        component: BlogRead
      },
      {
        path: 'update', // '/blog/:id/update'
        name: 'blogupdate',
        component: BlogUpdate
      }
    ]
  },
  {
    path: '/create',
    name: 'blogcreate',
    component: BlogCreate,
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
    component: UserLogin,
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
    component: UserRegister,
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
