import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/Index'),
      },
      {
        path: 'categories',
        component: () => import('@/views/home/Category'),
      },
      {
        path: 'category/:id',
        component: () => import('@/views/home/Category'),
      },
      {
        path: 'search',
        component: () => import('@/views/home/Search'),
      },
      {
        path: 'shopping-cart',
        component: () => import('@/views/home/ShoppingCart'),
      },
      {
        path: 'my',
        component: () => import('@/views/home/My'),
      },
    ]
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('@/views/user/Login')
  },
  {
    path: '/commodity/:id',
    name: 'Commodity',
    component: () => import('@/views/Commodity')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
