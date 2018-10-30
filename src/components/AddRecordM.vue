<template>
  <div v-if="RmdShow">
    <div class="add-student">
      <div class="title">请输入要添加的记录</div>
      <picker mode="date" @change="dateChange($event)" class="input1">
        <div class="date">请选择日期 {{Date}}</div>
      </picker>
      <picker mode="time" @change="startTimeChange($event)" class="input1">
        <div class="date">请选择开始时间 {{startTime}}</div>
      </picker>
      <picker mode="time" @change="endTimeChange($event)" class="input1">
        <div class="date">请选择结束时间 {{endTime}}</div>
      </picker>
      <div class="btnGroup">
        <div class="confirm" @click="addRecord">确认</div>
        <div class="cancle" @click="closeModal">取消</div>
      </div>
    </div>
    <div class="mask" @click="closeModal"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Date: '',
        startTime: '',
        endTime: ''
      };
    },
    props: ["RmdShow", "OpenId", "getRecordList"],
    methods: {
      closeModal() {
        this.$emit("close");
      },
      dateChange(e) {
        console.log(e.target.value)
        this.Date = e.target.value
      },
      startTimeChange(e) {
        this.startTime = e.target.value
      },
      endTimeChange(e) {
        this.endTime = e.target.value
      },
      addRecord() {
        if (this.startTime >= this.endTime) {
          wx.showToast({
            title: '起始时间不能大于结束时间',
            duration: 1500,
            icon: 'none'
          })
        } else {
          let startDate = `${this.Date} ${this.startTime}:0`
          let endDate = `${this.Date} ${this.endTime}:0`
          let startTime = new Date(startDate).getTime()
          let endTime = new Date(endDate).getTime()
          this.$fly.post(`http://47.107.116.71/open_days/${this.OpenId}/record/`, {
            "endTime": endTime,
            "id": this.OpenId,
            "startTime": startTime
          }).then((res) => {
            if (res.status == 200) {
              this.closeModal()
              this.$emit('reloadRecode')
            }
          })
        }

      }
    },
    mounted() {}
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
    flex-direction: column;
  }

  .title {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 34rpx;
    color: gray;
    text-align: center;
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
    padding: 20rpx 60rpx 30rpx 60rpx;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 26rpx;
    box-shadow: 0 20rpx 60rpx 0 rgba(95, 186, 233, 0.4);
    border-radius: 5px 5px 5px 5px;
    margin-top: -20rpx;
    margin-bottom: 10rpx;
  }

  .cancle {
    background-color: red;
    border: none;
    color: #fff;
    padding: 20rpx 60rpx 30rpx 60rpx;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 26rpx;
    box-shadow: 0 20rpx 60rpx 0 rgba(247, 84, 84, 0.4);
    border-radius: 5px 5px 5px 5px;
    margin-left: 20rpx;
    margin-top: -20rpx;
    margin-bottom: 10rpx;
  }

  .input1 {
    height: 40rpx;
    width: 96%;
    background: #e9e6e6;
    margin: 10rpx auto;
    padding: 10rpx;
    border-radius: 6rpx;

  }

  .date {
    width: 100%;
    height: 40rpx;
    color: black;
    line-height: 40rpx;
    font-size: 30rpx;
  }

</style>
