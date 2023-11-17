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
      component: () => import('../views/shared/auth/SigninView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-tracks',
      name: 'create-tracks',
      component: () => import('../views/tracks/CreateTrackView.vue')
    },
    {
      path: '/favorite-tracks',
      name: 'favorite-tracks',
      component: () => import('../views/tracks/FavoriteTrackView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/shared/auth/LoginView.vue'),
      beforeEnter: async (to, from, next)=>{ 
        if (await isAuthenticated())
        {
          next('/')
        }else{
          next()
        }
      }
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
    if(to.name !== 'signin'){
    return { name: 'login' }
    }
  }

})

export default router
