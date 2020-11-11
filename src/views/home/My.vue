<template>
  <div>
    <template v-if="currentUser">
      <van-contact-card type="edit" :name="currentUser.username" :tel="currentUser.phone" :editable="false"/>

      <van-cell-group>
        <van-cell title="退出当前用户" is-link to="/user/login" label="重新登录"/>
      </van-cell-group>
    </template>

    <template v-else>
      <van-cell-group>
        <van-cell title="用户登录" is-link to="/user/login" label="游客，请登录。"/>
      </van-cell-group>
    </template>
  </div>
</template>

<script>
  export default {
    name: "My",
    computed: {
      currentUser() {
        return this.$store.getters.getUser;
      }
    }
  }
</script>

<style scoped>

</style>