import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path:'/shopcart',
    component: Shopcart
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path:'/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//懒加载报错问题解决方案: 出错时重新渲染目标页面
//注册一个回调，在路由导航出错时被调用（一是在路由守卫中被同步抛出，或是在next(err)的方式异步捕获，
// 或是在渲染路由过程中，解析一个异步组件时发生错误）
router.onError((error) => {
  //当捕获到Loading chunk {n} failed的错误时我们重新渲染目标页面
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

export default router
