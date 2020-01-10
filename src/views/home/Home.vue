<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--默认隐藏的选项卡-->
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <!--轮播-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐-->
      <recommend-view :recommends="recommends"/>
      <!--流行-->
      <feature-view/>
      <!--选项卡-->
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <!--按选项卡的产品列表-->
      <good-list :goods="showGoods"/>
    </scroll>
    <!--当我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符-->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //组件
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childcomps/HomeSwiper'
  import RecommendView from './childcomps/RecommendView'
  import FeatureView from './childcomps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  //数据
  import {getHomeMultidata, getHomeGoods} from "network/home";
  //公用
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from 'common/mixin';
  import {BACK_POSITION} from 'common/const';

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
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      Scroll,
      GoodList
    },
    computed: {
      showGoods() {
        console.log(this.goods);
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据,直接执行methods中的方法
      this.getHomeMultidata();
      // 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {

    },
    destroyed() {

    },
    activated() {
      //再回到首页时立即回到上次的位置
      this.$refs.scroll.scollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //离开时保存位置
      this.saveY = this.$refs.scroll.getScrollY()
      //取消监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      //加载更多, 刷新滚动
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh()
      },
      //轮播图图片是否加载完
      swiperImageLoad() {
        //获取显示tabControl的offsetTop, 每个组件都有$el属性
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      //选项卡
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        //tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
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

          //完成上拉
          this.$refs.scroll.finishPullUp()
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

    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .tab-control {
    /*position: sticky;
    top: 44px;*/
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
