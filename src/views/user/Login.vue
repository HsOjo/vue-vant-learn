<template>
  <van-row>
    <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
    />

    <van-image width="100vw" height="128px" :src="require('@/assets/logo.png')" fit="scale-down"/>

    <van-form @submit="login(user)">
      <van-field
              v-model="user.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
              v-model="user.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </van-row>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: null,
          password: null,
        }
      }
    },
    methods: {
      login(user) {
        this.$axios.post('/api/user/login', user).then(
            resp => {
              let success = resp.code === 0;
              if (success) {
                this.$store.commit('setUser', resp.data);
                this.$router.push('/my');
              }
              this.$notify({
                type: success ? 'success' : 'danger',
                message: resp.msg,
              });
            }
        )
      },
    }
  }
</script>

<style scoped>

</style>
