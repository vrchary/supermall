<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--轮播-->
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <!--推荐-->
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  //组件
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childcomps/HomeSwiper'
  import RecommendView from './childcomps/RecommendView'

  //数据
  import {getHomeMultidata, getHomeGoods} from "network/home";


  export default {
    name: "Home",
    data() {
      return {
        result: null,
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new:{page: 0, list: []},
          sell:{page: 0, list: []}
        },
        currentType: 'pop'
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,

    },
    computed: {

    },
    created() {
      //请求多个数据,直接执行methods中的方法
      this.getHomeMultidata();
    },
    mounted() {

    },
    destroyed() {

    },
    activated() {

    },
    deactivated() {

    },
    methods: {
      //轮播图图片是否加载完
      swiperImageLoad() {
        console.log('aa');
      },
      //网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffff;
  }
</style>
