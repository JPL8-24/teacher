<template>
  <div v-if="OmdShow">
    <div class="add-student">
      <div class="first">
        <div class="portrait" @click="chooseImg"><img :src="portrait"></div>
        <input class="title-input" placeholder="开放日标题" v-model.lazy="title">
      </div>
      <textarea id="des-input" placeholder="请输入开放日的描述" v-model="des" adjust-position=true></textarea>
      <div class="btnGroup">
        <div class="confirm" @click="addOpenD">确认</div>
        <div class="cancle" @click="closeMoal">取消</div>
      </div>
    </div>
    <div class="mask" @click="closeMoal"></div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        portrait: "../../static/img/头像.png",
        title: "",
        des: "",
        fileKey: '',
        teacherId: ''
      };
    },
    components: {},
    methods: {
      chooseImg() {
        wx.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: res => {
            this.portrait = res.tempFilePaths[0]
            this.$fly.get(`http://47.107.116.71/files/upload/${this.portrait.slice(11)}`).then((res) => {
              console.log(res)
              this.fileKey = res.data.data.key
              wx.uploadFile({
                url: res.data.data.url,
                filePath: this.portrait,
                name: "file",
                formData: {
                  'key': res.data.data.key
                },
                complete: (res) => {
                  console.log(res)
                }
              })
            })
          }
        });
      },
      closeMoal() {
        this.$emit('close')
      },
      addOpenD() {
        if (this.userInfo.type == 2) {
          wx.showToast({
            title: '只有老师才能添加开放日哦',
            duration: 1500,
            icon: 'none',
            complete: () => {
              return
            }
          })
          return
        }
        this.$fly.post('http://47.107.116.71/open_days', {
          "description": this.des,
          "picKey": this.fileKey,
          "teacher": this.teacherId,
          "title": this.title,
        }).then((res) => {
          console.log(res)
          this.getUserOpenD()
          this.closeMoal()
        })
      },
      ...mapMutations([
        'saveUserOpenD'
      ]),
      getUserOpenD() {
        this.$fly.get('http://47.107.116.71:80/open_days').then((res) => {
          this.openD = res.data.data
          this.openD.forEach(async element => {
            await this.$fly.get(`http://47.107.116.71:80/user/info/${element.teacher}`).then((res) => {
              this.$set(element, "teacherName", res.data.data.username)
            })
            await this.$fly.get(`http://47.107.116.71:80/open_days/record/${element.id}`).then((res) => {
              if (res.data.data.length > 0) {
                this.$set(element, "startTime", this.timeFormat(res.data.data[0].startTime))
                this.$set(element, "endTime", this.timeFormat(res.data.data[0].endTime))
              } else {
                this.$set(element, "noRecord", true)
              }
            })
            await this.$fly.get(`http://47.107.116.71/open_days/user/${element.id}`).then((res) => {
              this.$set(element, 'member', res.data.data)
              this.$set(element, 'count', res.data.data.length)
            })
            await this.$fly.get(`http://47.107.116.71/files/download/${element.picKey}`).then((res)=>{
              this.$set(element,'portrait',res.data.data)
            })
          })
          this.saveUserOpenD(this.openD)
        })
      },
      timeFormat(value) {
        let date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
    },
    props: ['OmdShow'],
    mounted() {
      this.teacherId = this.userInfo.userId
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    }
  };

</script>

<style scoped>
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: #908d8d;
    opacity: 0.5;
  }

  .add-student {
    width: 700rpx;
    height: 500rpx;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 51;
    border-radius: 40rpx;
    transition: opacity 1s;
    display: flex;
    flex-direction: column;
  }

  .first {
    display: flex;
    width: 100%;
    height: 140rpx;
    align-items: center;
  }

  .portrait {
    height: 100%;
    width: 140rpx;
    margin-left: 20rpx;
    margin-top: 10rpx;
  }

  .portrait>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .title-input {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    text-align: center;
    font-size: 32rpx;
    flex: 1;
    border: 4rpx solid #f6f6f6;
    height: 60rpx;
    border-radius: 10rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
  }

  #des-input {
    width: 96%;
    height: 140rpx;
    background-color: #f6f6f6;
    color: #0d0d0d;
    margin: 10rpx auto;
    font-size: 32rpx;
    border-radius: 10rpx;
  }

  .input {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    text-align: center;
    font-size: 32rpx;
    margin: 20rpx auto;
    width: 96%;
    border: 4rpx solid #f6f6f6;
    height: 60rpx;
    margin-top: 20rpx;
  }

  .btnGroup {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
  }

  .confirm {
    background-color: #56baed;
    border: none;
    color: #fff;
    padding: 30rpx 80rpx;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 26rpx;
    box-shadow: 0 20rpx 60rpx 0 rgba(95, 186, 233, 0.4);
    border-radius: 5px 5px 5px 5px;
  }

  .cancle {
    background-color: red;
    border: none;
    color: #fff;
    padding: 30rpx 80rpx;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 26rpx;
    box-shadow: 0 20rpx 60rpx 0 rgba(247, 84, 84, 0.4);
    border-radius: 5px 5px 5px 5px;
    margin-left: 20rpx;
  }

</style>
