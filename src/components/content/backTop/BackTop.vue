<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png"/>
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
      backClick() {
        this.$emit('backClick')
      }
    }
  }
</script>

<style scoped>

</style>
