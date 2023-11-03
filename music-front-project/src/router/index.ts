import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/Auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/errors/404.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/errors/404.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

const isAuthenticated = async ()=>{
  const userStore = useUserStore()
  const user =  await userStore.getUserSession()
  return user?.email !== undefined
}

router.beforeEach(async (to, from) => {
  if (
    !await isAuthenticated() &&
    to.name !== 'login'
  ) {
    return { name: 'login' }
  }
})

export default router
