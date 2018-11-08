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
    <div v-for="item in chatList" :key="item.senderId" class="margin">
      <div class="msgA" v-if="item.senderId!=userInfo.userId">
        <div>
          <img :src="item.portrait">
        </div>
        <div class="msgA-content">
          <div class="left-triangle"></div>
          <div class="msgA-msg">
            <div v-if="!item.uplpadImg">{{item.content}}</div><img :src="item.uplpadImg" v-if="item.uplpadImg" @click="preView(item.uplpadImg)">
          </div>
        </div>
      </div>
      <div class="msgB" v-else>
        <div class="msgB-content">
          <div class="msgB-msg">
            <div v-if="!item.uplpadImg">{{item.content}}</div><img :src="item.uplpadImg" v-if="item.uplpadImg" @click="preView(item.uplpadImg)">
          </div>
          <div class="right-triangle"></div>
        </div>
        <div class="msgB-img">
          <img :src="item.portrait">
        </div>
      </div>
    </div>
    <div class="sepera"></div>
    <div class="sepera"></div>
    <div class="msg-input">
      <input type="text" class="input" v-model.lazy="msg" />
      <button @click="sendMsg">发送
      </button>
    </div>
    <div class="openD-info" @click="go('/OpenD-detail',OpenId)">
      <img src="../../../static/img/群聊.png">
    </div>
    <div class="openD-live" @click="startLive">
      <img src="../../../static/img/摄像头.png">
    </div>
    <div class="file" @click="file">
      <img src="../../../static/img/文件.png">
    </div>
    <live-pusher class="live" id="live" :url="url" mode="RTC" autopush v-if="living&&userInfo.type==0" />
    <live-player id="player" class="live" :src="url" mode="RTC" autoplay v-if="living&&userInfo.type==2" />
  </div>
</template>

<script>
  import Stomp from "stompjs";
  import {
    WebSocket
  } from '../../utils/WEB.js'
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        OpenId: "",
        liveContext: "",
        living: false,
        chatList: [],
        socket: '',
        msg: '',
        token: ''
      };
    },
    mounted() {
      let that = this
      this.OpenId = this.$root.$mp.query.id;
      this.getChatList();
      this.initSocket()
    },
    methods: {
      go(src, id) {
        wx.navigateTo({
          url: `/pages${src}/main?id=${id}`
        });
      },
      startLive() {
        if (this.living) {
          this.living = false;
        } else {
          this.living = true;
        }
      },
      getChatList() {
        this.$fly
          .get(`http://47.107.116.71/open_days/record/${this.OpenId}/messages`)
          .then(res => {
            this.chatList = res.data.data;
            this.chatList.forEach(element => {
              if (element.senderId) {
                this.$fly.get(`http://47.107.116.71:80/user/info/${element.senderId}`).then((res2) => {
                  let picKey = res2.data.data.picKey
                  this.$fly.get(`http://47.107.116.71/files/download/${picKey}`).then((res) => {
                    this.$set(element, 'portrait', res.data.data)
                  })
                })
              }
              if (element.type == 2) {
                this.$fly.get(`http://47.107.116.71/files/download/${element.content}`).then((res) => {
                  this.$set(element, 'uplpadImg', res.data.data)
                })
              }
            });
          })
      },
      initSocket() {
        let token = wx.getStorageSync('token')
        let _this = this
        this.token = token
        this.socket = new WebSocket()
        this.socket.buildConnect('ws://47.107.116.71/chat', `/message/group/${this.OpenId}`, function (res) {
          console.log(res)
          let newMsg = JSON.parse(res.body)
          if (newMsg.type == 0) {
            _this.$fly.get(`http://47.107.116.71:80/user/info/${newMsg.senderId}`).then((res) => {
              let picKey = res.data.data.picKey
              _this.$fly.get(`http://47.107.116.71/files/download/${picKey}`).then((res2) => {
                _this.$set(newMsg, 'portrait', res2.data.data)
                _this.chatList.push(newMsg)
              })
            })
          } else if (newMsg.type == 2) {
            console.log(newMsg)
            _this.$fly.get(`http://47.107.116.71:80/user/info/${newMsg.senderId}`).then((res) => {
              let picKey = res.data.data.picKey
              _this.$fly.get(`http://47.107.116.71/files/download/${picKey}`).then((res2) => {
                _this.$set(newMsg, 'portrait', res2.data.data)
                _this.$fly.get(`http://47.107.116.71/files/download/${newMsg.content}`).then((res3) => {
                  _this.$set(newMsg, 'uplpadImg', res3.data.data)
                  _this.chatList.push(newMsg)
                })
              })
            })
          }
        })
      },
      sendMsg() {
        this.socket.sendMessage(`/app/group/${this.OpenId}`, {
          "token": this.token
        }, {
          content: this.msg,
          type: 0
        })
        this.msg = ''
      },
      file() {
        wx.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: res => {
            let uploadImg = res.tempFilePaths[0]
            console.log(uploadImg)
            this.$fly.get(`http://47.107.116.71/files/upload/${uploadImg.slice(11)}`).then((res) => {
              console.log(res)
              let fileKey = res.data.data.key
              wx.uploadFile({
                url: res.data.data.url,
                filePath: uploadImg,
                name: "file",
                formData: {
                  'key': res.data.data.key
                },
                complete: (res) => {
                  this.socket.sendMessage(`/app/group/${this.OpenId}`, {
                    "token": this.token
                  }, {
                    content: fileKey,
                    type: 2,
                  })
                }
              })
            })
          }
        })
      },
      preView(url) {
        wx.previewImage({
          urls: [url]
        })
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      }),
      url() {
        return `rtmp://47.107.116.71:1935/live/${this.OpenId}`;
      }
    },
    onHide() {
      this.living = false;
    }
  };

</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    position: relative;
  }

  .msgA {
    display: flex;
    margin: 20rpx 0 20rpx 0;
  }

  .msgA div:first-child img {
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;
    filter: opacity(100%);
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

  .msgA-msg>img {
    filter: opacity(100%);
    width: 300rpx;
    height: 200rpx;
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
    margin: 20rpx 0 20rpx 0;
  }

  .msgB-img>img {
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;
    filter: opacity(100%);
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

  .msgB-msg>img {
    filter: opacity(100%);
    width: 300rpx;
    height: 200rpx;
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

  .openD-live {
    position: fixed;
    bottom: 80rpx;
    right: 100rpx;
    background-color: white;
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;
  }

  .openD-live>img {
    width: 100%;
    height: 100%;
  }

  .live {
    position: relative;
    width: 100%;
    height: 800rpx;
    top: -212rpx;
  }

  .sepera {
    width: 100%;
    height: 70rpx;
    opacity: 0;
  }

  .file {
    position: fixed;
    bottom: 80rpx;
    right: 180rpx;
    background-color: white;
    height: 70rpx;
    width: 70rpx;
    border-radius: 50%;
  }

  .file>img {
    width: 100%;
    height: 100%;
  }

</style>
