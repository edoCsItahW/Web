import { createRouter, createWebHistory } from 'vue-router'
import home from '@/components/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'Home',
          component: home
      }
  ]
})

export default router
