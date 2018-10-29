<template>
  <div>
    <button open-type="getUserInfo" v-if="caniuse" @getuserinfo="change">用户授权</button>
    <div class="container" v-if="!caniuse">
      <div class="logo">
        <img class="logo-img" src="../../../static/img/logo.svg" alt="logo">
      </div>
      <div class="userinfo">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <p>WelCome! {{userInfo.nickName}}</p>
      </div>
      <div class="button">
        <button @click="go">点击进入</button>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        userInfo: {},
        caniuse: true
      }
    },

    components: {},
    methods: {
      getUserInfo() {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo
                if (res.userInfo) {
                  wx.setStorageSync('useinfo', res.userInfo)
                }
              }
            })
          }
        })
      },
      go() {
        wx.switchTab({
          url: '/pages/home/main'
        })
      },
      change() {
        this.caniuse = false
        this.getUserInfo()
      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      // this.getUserInfo()
      if (wx.getStorageSync('useinfo')) {
        this.caniuse = false;
        this.getUserInfo()
      }

    }
  }

</script>

<style scoped>
  .container {
    background: #222;
    height: 100vh;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

  }

  .logo {
    text-align: center;
    position: relative;
    width: 100%;
    height: 500rpx;
  }

  .logo>.logo-img {
    width: 500rpx;
    height: 500rpx;
    animation: logo-animate infinite 10s linear;
  }

  @keyframes logo-animate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .userinfo {
    text-align: center;
    position: absolute;
    top: 500rpx;
  }

  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
  }

  .userinfo>p {
    color: white;
    font-weight: bold;
    margin-top: 50rpx;
    animation: wobble 2s;
  }

  @keyframes wobble {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    15% {
      -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
      transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }

    30% {
      -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
      transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }

    45% {
      -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
      transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }

    60% {
      -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
      transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }

    75% {
      -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
      transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .button {
    text-align: center;
    position: absolute;
    bottom: 170rpx;
  }

  .button>button {
    background: #222;
    color: white;
    border: 2px white solid;
  }

</style>
