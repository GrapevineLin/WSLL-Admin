import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import GoodsList from './components/GoodsList'
import Login from './views/login.vue'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'login',
    component: Login,
  }, {
    path: '/main',
    name: 'main',
    component: Main,
    children: [{
      path: '/goodslist',
      name: 'goodslist',
      component: GoodsList
    }, {
      path: '/cardslist',
      name: 'cardslist',
      component: () => import('./components/CardList.vue')
    }]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login.vue')
  }
]
const router = new Router({
  mode: 'history', //去掉url中的#
  routes: routes
});
export default router;