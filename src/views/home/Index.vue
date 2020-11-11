<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in banner_items" :key="index" @click="$router.push(item.url)">
        <img v-lazy="item.img" alt="" src="" class="banner-img"/>
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="5" clickable style="justify-content: center">
      <van-grid-item v-for="item in categories" :key="item.id" @click="openCategory(item.id)">
        <van-image :src="item.img" width="32" height="32"></van-image>
        <p style="text-align: center">{{ item.name }}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner_items: [],
        categories: [],
      }
    },
    name: "Index",
    created() {
      this.getBannerItems();
      this.getCategories();
    },
    methods: {
      getBannerItems(){
        this.$axios.get('/api/banner').then(
            resp => {
              if (resp.code === 0) {
                this.banner_items = resp.data;
              }
            }
        )
      },
      getCategories() {
        this.$axios.get('/api/categories').then(
            resp => {
              if (resp.code === 0) {
                this.categories = resp.data;
              }
            }
        )
      },
      openCategory(id){
        this.$router.push(`/category/${id}`);
      }
    }
  }
</script>

<style scoped>
  .banner-img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
</style>