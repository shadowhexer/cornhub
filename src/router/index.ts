import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/services/Session';
import API from '@/services/api';
import HomeView from '../views/HomeView.vue'
import Callback from '@/components/Callback.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}

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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { token, user } = storeToRefs(authStore);

  // Update the document title
  document.title = to.meta.title || 'Page Not Found - OnlyCorn';

  // Define routes that do not require authentication
  const publicRoutes = ['/', '/login', '/products'];

  if (!publicRoutes.includes(to.path)) {
    try {
      // Check if the user is authenticated
      if (!token.value || !user.value?.id) {
        // If the user is not authenticated, redirect to the login page
        next({ path: '/login', query: { redirect: to.fullPath } });
        return;
      }

      // Verify the user's authentication status with the server
      const response = await API.get(`/verify?user=${user.value?.id}`);

      // If the user is not authenticated, log them out and redirect to login
      if (response.data.login === false) {
        authStore.logout(); // Clear token and user
        next({ path: '/login', query: { redirect: to.fullPath } });
        return;
      } else {
        console.log('User is authenticated');
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);

      // Handle the error gracefully (e.g., redirect to login or show a message)
      authStore.logout(); // Clear token and user
      next({ path: '/login', query: { redirect: to.fullPath } });
      return;
    }
  }

  // If everything is fine, proceed to the requested route
  next();
});

export default router
