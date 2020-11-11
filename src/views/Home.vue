<template>
  <van-row>
    <van-nav-bar :title="tabTitle"/>

    <router-view></router-view>

    <van-tabbar v-model="tab_active">
      <van-tabbar-item v-for="tab in tabs" :key="tab.to" :to="tab.to" :icon="tab.icon">
        {{tab.title}}
      </van-tabbar-item>
    </van-tabbar>
  </van-row>
</template>

<script>
  export default {
    name: "Home",
    computed: {
      tabTitle() {
        return this.tabs[this.tab_active]?.title;
      }
    },
    data() {
      return {
        tabs: [
          {icon: 'home-o', to: '/', title: '首页'},
          {icon: 'apps-o', to: '/categories', title: '分类'},
          {icon: 'search', to: '/search', title: '搜索'},
          {icon: 'shopping-cart-o', to: '/shopping-cart', title: '购物车'},
          {icon: 'user-o', to: '/my', title: '我的'},
        ],
        tab_active: null,
      }
    },
    created() {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.$route.path === this.tabs[i].to) {
          this.tab_active = i;
        }
      }
    },
  }
</script>

<style scoped>

</style>
