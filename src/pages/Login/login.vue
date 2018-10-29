<template>
  <div class="wrapper fadeInDown">
    <div class="formContent">
      <h2 class="active">欢迎登录教师开放日小程序</h2>
      <div class="first fadeIn">
        <img src='../../../static/img/登录.png'>
      </div>
      <input class="input fadeIn" placeholder="学号" v-model="userId" />
      <input class="input fadeIn" placeholder="密码" type="password" v-model="passWord" />
      <button class="login fadeIn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userId: "",
      passWord: ""
    };
  },
  components: {},
  methods: {
    login() {
      this.$fly
        .get(
          `http://47.107.116.71:80/user/login?password=${
            this.passWord
          }&&user-id=${this.userId}`
        )
        .then(res => {
          if (res.data.success) {
            wx.setStorageSync("token", res.data.data);
            this.$fly
              .get(`http://47.107.116.71:80/user/info/${this.userId}`)
              .then(res => {
                this.$store.commit("saveUserInfo", res.data.data);
                wx.showToast({
                  title: "登录成功",
                  icon: "success",
                  duration: 1000,
                  complete: () => {
                    wx.switchTab({
                      url: "/pages/home/main"
                    });
                  }
                });
              });
          } else {
            wx.showToast({
              title: "登录失败",
              icon: "none",
              duration: 1000
            });
          }
        });
    }
  }
};
</script>

<style scoped>
page {
  height: 100%;
  width: 100%;
}

.wrapper {
  width: 100%;
  min-height: 100%;
}

.fadeInDown {
  animation: fadeInDown 1s both;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0,-100%,0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}

.formContent {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
  margin-top: 20rpx;
  font-size: 40rpx;
}

.first {
  height: 250rpx;
  width: 250rpx;
}

.fadeIn {
  opacity: 0;
  animation: fadeIn ease-in 1;
  animation-fill-mode: forwards;
  animation-duration: 1.3s;
  animation-delay: 0.4s;
}

.first > img {
  width: 100%;
  height: 100%;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.input {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  text-align: center;
  font-size: 32rpx;
  margin: 20rpx auto;
  width: 100%;
  border: 4rpx solid #f6f6f6;
  transition: all 0.5s ease-in-out;
  height: 80rpx;
}

.login {
  background-color: #56baed;
  border: none;
  color: #fff;
  padding: 30rpx 160rpx;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 26rpx;
  box-shadow: 0 20rpx 60rpx 0 rgba(95, 186, 233, 0.4);
  border-radius: 5px 5px 5px 5px;
  margin: 10rpx 40rpx -20rpx 40rpx;
  transition: all 0.3s ease-in-out;
}

.login:active {
  transform: scale(0.95);
}
</style>
