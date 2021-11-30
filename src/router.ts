import { createRouter, createWebHashHistory } from 'vue-router'
const home = () => import('../src/pages/home.vue')
const page1 = () => import('../src/pages/page1.vue')
const page2 = () => import('../src/pages/page2.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/page1',
    name: 'page1',
    component: page1
  },
  {
    path: '/page2',
    name: 'page2',
    component: page2
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})