<template>
  <div class="tab-bar">
      <!--父不应该管每个item中的内容与样式,做成活的-->
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
    }
  }
 }
</script>

<style scoped>
.tab-bar{
  /*平铺*/
  display: flex;
  background-color: #f6f6f6;

  /*底部*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 阴影：x, y, 模糊程度， 颜色（红绿蓝 数值或者百分数， alpha透明度:0-1之间）*/
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}

</style>
