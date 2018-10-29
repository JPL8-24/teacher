<template>
  <div class="icon-list">
    <div class="background"></div>
    <div class="icon-item" @click="go('/AllOpenD')">
      <div class="item-img">
        <img src="../../static/img/人.png" class="img-content">
      </div>
      <div class="icon-dec">
        <p>开放日列表</p>
      </div>
    </div>
    <div class="icon-item">
      <div class="item-img">
        <img src="../../static/img/反馈.png" class="img-content">
      </div>
      <div class="icon-dec">
        <p>问题反馈</p>
      </div>
    </div>
    <div class="icon-item">
      <div class="item-img">
        <img src="../../static/img/我们.png" class="img-content">
      </div>
      <div class="icon-dec">
        <p>关于我们</p>
      </div>
    </div>
    <div class="icon-item">
      <div class="item-img">
        <img src="../../static/img/帮助.png" class="img-content">
      </div>
      <div class="icon-dec">
        <p>帮助</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IconList",
    methods: {
      go(src) {
        wx.navigateTo({
          url: `/pages${src}/main`
        })
      }
    }
  };

</script>

<style scoped>
  .icon-list {
    width: 96%;
    margin: 10rpx auto;
    /*background: white;*/
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    position: relative;
    border-radius: 20rpx;

  }

  .background {
    content: '';
    background-image: url("http://bpic.588ku.com/back_pic/04/98/76/19593bff78cc6b8.jpg");
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-size: 100% 100%;
    border-radius: 20rpx;
    pointer-events: none;
  }

  .icon-item {
    width: 25%;
    height: 170rpx;
    position: relative;
  }

  .item-img {
    position: absolute;
    top: 10rpx;
    left: 20rpx;
    right: 20rpx;
    bottom: 30rpx;
    margin-left: 10rpx;
    margin-right: 10rpx;
    box-sizing: border-box;
    margin-bottom: 10rpx;
  }

  .img-content {
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }

  .icon-dec {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 30rpx;
    height: 30rpx;
    text-align: center;
    font-size: 20rpx;

  }

</style>
