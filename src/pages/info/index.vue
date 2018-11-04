<template>
  <div class="container">
    <div class="background"></div>
    <div class="user-info">
      <div class="userinfo">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <p>{{userInfo.nickName}}</p>
      </div>
    </div>
    <div class="menu">
      <div class="menu-item">
        <div class="icon"><img src="../../../static/img/help.png"> </div>
        <div class="content">帮助</div>
        <div class="icon-right">></div>
      </div>
      <div class="menu-item" @click="goTo('/feedback')">
        <div class="icon"><img src="../../../static/img/反馈.png"> </div>
        <div class="content">反馈</div>
        <div class="icon-right">></div>
      </div>
      <div class="menu-item" @click="goTo('/aboutUs')">
        <div class="icon"><img src="../../../static/img/我们.png"> </div>
        <div class="content">关于我们</div>
        <div class="icon-right">></div>
      </div>
    </div>
    <div class="menu">
      <div class="menu-item" @click="OmdShow=true">
        <div class="icon"><img src="../../../static/img/添加.png"> </div>
        <div class="content">添加开放日</div>
        <div class="icon-right">></div>
      </div>
      <div class="menu-item">
        <div class="icon"><img src="../../../static/img/help.png"> </div>
        <div class="content">帮助反馈</div>
        <div class="icon-right">></div>
      </div>
      <div class="menu-item" @click="clearRubish">
        <div class="icon"><img src="../../../static/img/清理.png"> </div>
        <div class="content">清理缓存</div>
        <div class="icon-right">></div>
      </div>
    </div>
    <add-open-m :OmdShow="OmdShow" @close="OcloseModal"></add-open-m>
  </div>

</template>

<script>
  import AddOpenM from '../../components/AddOpenM'
  export default {
    data() {
      return {
        userInfo: {},
        OmdShow: false
      }
    },
    methods: {
      getuser() {
        this.userInfo = Object.assign({}, wx.getStorageSync('useinfo'))
      },
      goTo(src) {
        wx.navigateTo({
          url: `/pages${src}/main`
        })
      },
      clearRubish() {
        wx.showModal({
          title: '确认清空缓存',
          content: '会删除所有本地数据',
          confirmText: '确定',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              wx.clearStorageSync()
              wx.showToast({
                title: '清理成功!',
                icon: 'success',
                mask: true,
                duration: 1000,
                success: () => {
                  wx.redirectTo({
                    url: '/pages/index/main'
                  })
                }
              })
            }
          }
        })
      },
      OcloseModal() {
        this.OmdShow = false
      }

    },
    mounted() {
      this.getuser()
    },
    components: {
      AddOpenM
    }
  };

</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("http://bpic.588ku.com/back_pic/04/93/27/405919c54416002.jpg");
    background-size: 100% 100%;
    filter: opacity(20%);
  }

  .user-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350rpx;
    justify-content: center;
    text-align: center;
    filter: opacity(100%);
  }

  .userinfo-avatar {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
  }

  .menu {
    width: 98%;
    height: 240rpx;
    background: white;
    margin: 10rpx auto 40rpx auto;
    filter: opacity(100%);
    position: relative;
    border-radius: 6rpx;
  }

  .menu-item {
    height: 32.8%;
    width: 100%;
    display: flex;
    border-bottom: 2rpx solid #e0e0e0;
  }

  .icon {
    position: relative;
    width: 50rpx;
    height: 50rpx;
    left: 10rpx;
    top: 13rpx;

  }

  .icon>img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .content {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    margin-left: 20rpx;
    font-weight: bold;
    color: #5e5e5e;
    position: relative;
    top: 8rpx;
  }

  .icon-right {
    position: absolute;
    width: 50rpx;
    height: 50rpx;
    right: 0;
    color: #5e5e5e;
    font-weight: bold;
  }

</style>
