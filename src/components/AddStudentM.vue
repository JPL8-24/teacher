<template>
  <div v-if="SmdShow">
    <div class="add-student">
      <div class="title">请输入要添加的学生ID</div>
      <input class="input" placeholder="学生ID" v-model.lazy="studentId">
      <div class="btnGroup">
        <div class="confirm" @click="addStudent">确认</div>
        <div class="cancle" @click="closeModal">取消</div>
      </div>
    </div>
    <div class="mask" @click="closeModal"></div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        studentId: ''
      }
    },
    methods: {
      addStudent() {
        if (this.userInfo.type == 2) {
          wx.showToast({
            title: '只有老师才能添加学生哦',
            duration: 1500,
            icon: 'none',
            complete: () => {
              return
            }
          })
          return
        }
        this.$fly.post(`http://47.107.116.71/open_days/${this.OpenId}/students`, [`${this.studentId}`]).then((res) => {
          console.log(res)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500,
            complete: () => {
              this.closeModal()
              this.$emit( "reloadMember")
            }
          })
        })
      },
      closeModal() {
        this.$emit('close')
      }
    },
    props: ['SmdShow', 'OpenId'],
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    }
  }

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
    width: 600rpx;
    height: 400rpx;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -300rpx;
    margin-top: -200rpx;
    background-color: white;
    z-index: 51;
    border-radius: 40rpx;
    transition: opacity 1s;
    display: flex;
    flex-direction: column
  }

  .title {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 34rpx;
    color: gray;
    text-align: center
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
