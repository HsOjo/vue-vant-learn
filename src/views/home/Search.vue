<template>
  <div>
    <van-search v-model="keyword" placeholder="请输入搜索关键词"/>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        keyword: null,
      }
    }
  }
</script>

<style scoped>

</style>