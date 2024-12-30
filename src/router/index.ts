import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Callback from '@/components/Callback.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'OnlyCorn' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/notification',
    name: 'notification',
    component: () => import('../views/NotificationView.vue'),
    meta: { title: 'Notifications' },
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('../views/Messages.vue'),
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('../views/BookmarksView.vue'),
    meta: { title: 'Bookmarks' },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/StoreView.vue'),
    meta: { title: 'Store' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    meta: { title: 'Cart' },
  },
  {
    path: '/payment-method',
    name: 'payment-method',
    component: () => import('../views/PaymentMethod.vue'),
    meta: { title: 'Payment Method' },
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/UserProfile.vue'),
    meta: { title: 'Profile' },
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/SettingView.vue'),
    meta: { title: 'Settings' },
  },
  {
    path: '/auth/callback',
    name: 'Callback',
    component: Callback,
    meta: { title: 'Loging in......' },
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Page Not Found -  OnlyCorn';
  next();
});

export default router
