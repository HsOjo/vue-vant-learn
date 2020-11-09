<template>
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
        提交
      </van-button>
    </div>
  </van-form>
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
            (resp) => {
              let rd = resp.data;
              if (rd.code === 0) {
                this.$store.commit('setToken', rd.data.token)
              }
            }
        )
      },
    }
  }
</script>

<style scoped>

</style>
