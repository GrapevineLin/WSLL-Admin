import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import GoodsList from './components/GoodsList'
import Login from './views/login.vue'

Vue.use(Router)

const routes = [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: Login,
  }, {
    path: '/main',
    name: 'main',
    component: Main,
    meta: {
      requiresAuth: true
    },
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
    path: '/login',
    name: 'login',
    component: () => import('./views/login.vue')
  }
]
const router = new Router({
  base: '/wsll-admin',
  mode: 'history', //去掉url中的#
  routes: routes
});
router.beforeEach((to, from, next) => {
  //matched的数组中包含$route对象的检查元字段
  //arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //判断当前是否有登录的权限
    if (localStorage.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router;