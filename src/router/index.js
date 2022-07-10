import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import ContactEdit from "@/views/ContactEdit.vue";
import ContactDetails from "@/views/ContactDetails.vue";
import Signup from "@/views/Signup.vue";
import Login from '@/views/Login.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ContactApp.vue')
    },
    {
      path: '/contact/:id',
      name: 'contact-details',
      component: ContactDetails
    },
    {
      path: '/contact/edit/:id?',
      name: 'contact-edit',
      component: ContactEdit,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('@/views/StatisticsPage.vue')
    }
  ]
})

export default router
