<template>
  <div class="chat-container">
    <div class="background"></div>
    <div>
      <div class="msgA">
        <div>
          <img src="../../../static/img/testimg.jpg">
        </div>
        <div class="msgA-content">
          <div class="left-triangle"></div>
          <div class="msgA-msg"> hello! man!</div>
        </div>
      </div>
    </div>
    <div>
      <div class="msgB">
        <div class="msgB-content">
          <div class="msgB-msg"> hello! man!</div>
          <div class="right-triangle"></div>
        </div>
        <div class="msgB-img">
          <img src="../../../static/img/testimg.jpg">
        </div>
      </div>
    </div>
    <div class="msg-input">
      <input type="text" class="input" />
      <button>发送
      </button>
    </div>
    <div class="openD-info" @click="go('/OpenD-detail',OpenId)">
      <img src="../../../static/img/群聊.png">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        OpenId: ''
      };
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: "关于web前端某老师的OpenDay"
      });
      this.OpenId = this.$root.$mp.query.id
      console.log(this.OpenId)
    },
    methods: {
      go(src,id) {
        wx.navigateTo({
          url: `/pages${src}/main?id=${id}`
        })
      }
    }
  };

</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  .msgA {
    display: flex;
    margin: 20rpx 0 20rpx 0;
  }

  .msgA div:first-child img {
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;
  }

  .msgA-content {
    display: flex;
  }

  .msgA-msg {
    background-color: aquamarine;
    max-width: 500rpx;
    min-height: 5rpx;
    word-break: break-all;
    border-radius: 12rpx;
    font-size: 30rpx;
    padding: 15rpx 10rpx 10rpx 10rpx;
  }

  .left-triangle {
    width: 0;
    height: 0;
    border-width: 18rpx;
    border-style: solid;
    border-color: transparent aquamarine transparent transparent;
    position: relative;
    top: 12rpx;
  }

  .msgB {
    display: flex;
    justify-content: flex-end;
  }

  .msgB-img>img {
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;
  }

  .msgB-content {
    display: flex;
  }

  .msgB-msg {
    background-color: gold;
    max-width: 500rpx;
    min-height: 5rpx;
    word-break: break-all;
    border-radius: 12rpx;
    font-size: 30rpx;
    padding: 15rpx 10rpx 10rpx 10rpx;
  }

  .right-triangle {
    width: 0;
    height: 0;
    border-width: 18rpx;
    border-style: solid;
    border-color: transparent transparent transparent gold;
    position: relative;
    top: 12rpx;
  }

  .msg-input {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70rpx;
  }

  .input {
    flex: 1;
    height: 100%;
    background-color: white;
  }

  .msg-input>button {
    font-size: 30rpx;
    font-weight: bold;
    background: #ffab02;
    height: 100%;
    color: white;
  }

  .background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("http://bpic.588ku.com/back_pic/04/93/27/405919c54416002.jpg");
    filter: opacity(20%);
    background-size: cover;
  }

  .openD-info {
    position: fixed;
    bottom: 80rpx;
    right: 10rpx;
    background-color: white;
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;

  }

  .openD-info>img {
    width: 100%;
    height: 100%;
  }

</style>
