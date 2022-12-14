import Vue from 'vue'
import VueRouter from 'vue-router'

import authGuard from './guards/auth.guard'
import roleGuard from './guards/role.guard'


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
    component: () => import( '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import( '../views/UsersView.vue'),
    meta: {
      requiresAuth: true,
      requiresAmin: true
    },
  },
  {
    path: '*',
    component: () => import( '../views/HomeView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authGuard)
router.beforeEach(roleGuard)



export default router
