<template>
  <div class="tab_control">
    <div v-for="(item, index) in titles" :key="item.index" class="tab_control_item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
  .tab_control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab_control_item {
    flex: 1;
  }
  .active {
    color: #ff5777;
  }
  .active span {
    border-bottom: 3px sold var(--color-tint);
  }
</style>
