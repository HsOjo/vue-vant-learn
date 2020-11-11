<template>
  <div>
    <van-col span="6">
      <van-sidebar v-model="category_index" @change="categoryChanged" style="width: 100%">
        <van-sidebar-item v-for="item in categories" :key="item.id" :title="item.name"/>
      </van-sidebar>
    </van-col>
    <van-col span="18">
      <van-grid :column-num="2" clickable>
        <van-grid-item v-for="item in category.items" :key="item.id" @click="openCommodity(item.id)">
          <van-image :src="item.img" width="96" height="64"></van-image>
          <p style="text-align: center">{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </van-col>
  </div>
</template>

<script>
  export default {
    name: "Category",
    computed: {
      categoryId() {
        return this.$route.params.id;
      }
    },
    data() {
      return {
        category_index: null,
        categories: null,
        category: {},
      }
    },
    created() {
      this.getCategories();
      if (this.categoryId) {
        this.getCategory(this.categoryId);
      }
    },
    methods: {
      categoryChanged(index) {
        if (index >= 0 && this.categories?.length > index) {
          this.category = this.categories[index];
          this.$router.push(`/category/${this.category.id}`)
          this.getCategory(this.category.id);
        }
      },
      getCategories() {
        this.$axios.get('/api/categories').then(
            resp => {
              if (resp.code === 0) {
                this.categories = resp.data;
                for (let i = 0; i < this.categories.length; i++) {
                  if (this.categories[i].id === this.categoryId){
                    this.category_index = i;
                  }
                }
                if (this.categories.length > 0 && !this.categoryId) {
                  this.getCategory(this.categories[0].id);
                }
              }
            }
        )
      },
      getCategory(category_id) {
        this.$axios.get(`/api/category/${category_id}`).then(
            resp => {
              if (resp.code === 0) {
                this.category = resp.data;
              } else {
                this.$notify({message: resp.msg, type: "danger"});
                this.$router.back();
              }
            }
        )
      },
      openCommodity(id) {
        this.$router.push(`/commodity/${id}`);
      }
    }
  }
</script>

<style scoped>

</style>