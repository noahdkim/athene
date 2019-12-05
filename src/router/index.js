import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import DevotionalsHome from '@/views/devotionals/DevotionalsHome.vue'
import CreateDevotional from '@/views/devotionals/CreateDevotional.vue'
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
    path: '/devotionals',
    name: 'devotionals',
    component: DevotionalsHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-devotional',
    name: 'create-devotional',
    component: CreateDevotional,
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
  console.log(isAuthenticated)
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else if (!requiresAuth && isAuthenticated) {
    next('/devotionals')
  } else {
    next()
  }
})

export default router
