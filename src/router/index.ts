import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pages/album'
  },
  {
    path: '/cadastro',
    component: () => import('@/views/cadastroPage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/loginPage.vue')
  },
  {
     path: '/resetpass',
    component: () => import('@/views/ResetPassPage.vue')
  },
  {
    path: '/pages/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/pages/album'
      },

      {
        path: 'album',
        component: () => import('@/views/AlbumPage.vue')
      },
      
      {
        path: 'perfil',
        component: () => import('@/views/PerfilPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
