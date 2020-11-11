<template>
  <div>
    <van-card v-for="item in cart_items" :key="item.id"
              :price="item.price" :num="item.num"
              :title="item.name" :desc="item.description"
              :thumb="item.img" :origin-price="item.price_origin"
              @click-thumb="openCommodity(item.id)"
    >
      <template #footer>
        <van-button size="mini" type="danger" @click="removeCartItem(item.id)">移除</van-button>
      </template>
    </van-card>
    <van-submit-bar :price="totalPrice * 100" button-text="清空购物车" @submit="clearCart" style="margin-bottom: 50px"/>
  </div>
</template>

<script>
  export default {
    name: "ShoppingCart",
    computed: {
      totalPrice(){
        let price = 0;
        for (let item of this.cart_items){
          price = price + item.price * item.num;
        }
        return price;
      }
    },
    data() {
      return {
        cart_items: [],
      }
    },
    created() {
      this.getCartItems();
    },
    methods: {
      getCartItems() {
        this.$axios.get('/api/shopping-cart').then(
            resp => {
              if (resp.code === 0) {
                this.cart_items = resp.data;
              }
            }
        )
      },
      removeCartItem(id) {
        this.$axios.post('/api/shopping-cart/remove', {
          id: id,
        }).then(
            resp => {
              let success = resp.code === 0;
              if (success) {
                this.cart_items = resp.data;
                this.getCartItems();
              }
              this.$notify({message: resp.msg, type: success ? 'success' : 'danger'});
            }
        )
      },
      openCommodity(id){
        this.$router.push(`/commodity/${id}`);
      },
      clearCart(){
        this.$axios.get('/api/shopping-cart/clear').then(
            resp => {
              let success = resp.code === 0;
              if (success) {
                this.getCartItems();
              }
              this.$notify({message: resp.msg, type: success ? 'success' : 'danger'});
            }
        )
      }
    },
  }
</script>

<style scoped>

</style>