<template>
  <div>
    <van-nav-bar
            :title="commodity.name"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
    />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(img, index) in commodity.picture" :key="index">
        <img v-lazy="img" alt="" src="" class="commodity-img"/>
      </van-swipe-item>
    </van-swipe>

    <van-row style="margin: 16px">
      <span style="color: black; font-size: 16px">{{commodity.name}}</span>
      <span style="float: right; font-size: 14px">¥{{commodity.price}}</span>
      <span style="float: right; font-size: 12px; text-decoration: line-through; color:gray">
        ¥{{commodity.price_origin}}
      </span>
      <p style="font-size: 12px">{{commodity.description}}</p>
    </van-row>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车"/>
      <van-goods-action-icon icon="shop-o" text="店铺"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addShoppingCart(commodityId)"/>
      <van-goods-action-button type="danger" text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
  export default {
    name: "Commodity",
    data() {
      return {
        commodity: {},
      }
    },
    computed: {
      commodityId() {
        return this.$route.params.id;
      }
    },
    created() {
      this.getCommodity(this.commodityId);
    },
    methods: {
      getCommodity(id) {
        this.$axios.get(`/api/commodity/${id}`).then(
            resp => {
              if (resp.code === 0) {
                this.commodity = resp.data;
              } else {
                this.$notify({message: resp.msg, type: "danger"});
                this.$router.back();
              }
            }
        )
      },
      addShoppingCart(id) {
        this.$axios.post(`/api/shopping-cart/add`, {
          id: id,
        }).then(
            resp => {
              let success = resp.code === 0;
              this.$notify({message: resp.msg, type: success ? 'success' : 'danger'});
            }
        )
      }
    },
  }
</script>

<style scoped>
  .commodity-img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
</style>