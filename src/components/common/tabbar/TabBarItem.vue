<template>
  <div class="tab-bar-item" @click="itemClick()">
    <!--活动与不活动也不同,slot为全部替换，要加样式，再包上一层div-->
    <div v-if = "!isActive">
      <slot name = "item-icon"></slot>
    </div>
    <div v-else>
      <slot name = "item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name = "item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor:{
      type: String,
      default: 'red',
    }
  },
  data() {
    return {

    }
  },
  computed:{
    isActive(){
      // 当前活动的路由与当前组件被传入的路径进行比较
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path != this.path) {
        this.$router.replace(this.path)
      }
    }
  }
 }
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img{
    width:24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
}
.active{
    color: blueviolet;
}
</style>
