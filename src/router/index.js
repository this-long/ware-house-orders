import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: '/MenuPage',
        name: 'MenuPage',
        component: () => import('../views/MenuPage.vue')
      },
      {
        // 仓库图层
        path: '/WareHouseMain',
        name: 'WareHouseMain',
        component: () => import('../views/WareHouseMain.vue')
      }, {
        // 客户位置
        path: '/CustomerLocation',
        name: 'CustomerLocation',
        component: () => import('../views/CustomerLocation.vue')
      }, {
        // 订单列表
        path: '/OrderLists',
        name: 'OrderLists',
        component: () => import('../views/OrderLists.vue')
      }, {
        // 数据可视化
        path: '/CharList',
        name: 'CharList',
        component: () => import('../views/CharList.vue')
      }, {
        // 路径绘画
        path: '/PathPlan',
        name: 'PathPlan',
        component: () => import('../views/PathPlan.vue')
      }, {
        // 仓库库存
        path: '/WareInventory',
        name: 'WareInventory',
        component: () => import('../views/WareInventory.vue')
      }, {
        // 设置
        path: '/SetPage',
        name: 'SetPage',
        component: () => import('../views/SetPage.vue')
      }, {
        // 仓库详情
        path: '/WareHouseList',
        name: 'WareHouseList',
        component: () => import('../views/WareHouseList.vue')
      },
      {
        // 添加商品
        path: '/addWareThings',
        name: 'addWareThings',
        component: () => import('../views/addWareThings.vue')
      }
    ]
  }, {
    path: '/login',
    name: 'LoginUser',
    component: () => import('../views/LoginUser.vue')
  }

]

const router = new VueRouter({
  routes
})

// 路由导航
router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')

  // console.log(username)

  if (to.path !== "/login" && username === null) next("/login");
  next();
})

export default router
