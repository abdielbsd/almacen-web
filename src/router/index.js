import Vue from 'vue'
import VueRouter from 'vue-router'

import authGuard from './guards/auth.guard'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import( '../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authGuard)



export default router
