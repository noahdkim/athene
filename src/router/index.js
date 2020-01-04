import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import DevotionalsAnalytics from '@/views/devotionals/DevotionalsAnalytics.vue'
import DevotionalCreate from '@/views/devotionals/DevotionalCreate.vue'
import DevotionalsViewContent from '@/views/devotionals/view/DevotionalsViewContent.vue'
import DevotionalsViewList from '@/views/devotionals/view/DevotionalsViewList.vue'
import ReadingViewList from '@/views/reading/view/ReadingViewList.vue'
import ReadingCreate from '@/views/reading/create/ReadingCreate.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/devotionals/view',
    name: 'devotionals',
    component: DevotionalsViewList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devotionals/create',
    name: 'devotional-create',
    component: DevotionalCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devotionals/view/:contentId',
    name: 'devotionals-view-content',
    component: DevotionalsViewContent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devotionals/analytics',
    name: 'devotionals-analytics',
    component: DevotionalsAnalytics,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reading/view',
    name: 'reading-view-list',
    component: ReadingViewList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reading/create',
    name: 'reading-create',
    component: ReadingCreate,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters.isAuthenticated
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else if (!requiresAuth && isAuthenticated) {
    next('/devotionals/view')
  } else {
    next()
  }
})

export default router
