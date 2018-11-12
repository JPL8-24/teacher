<template>
  <div class="Detail-container">
    <div class="OpenD-info">
      <div class="OpenD-img"><img :src="portrait" /></div>
      <div class="OpenD-title">{{title}}</div>
    </div>
    <div class="OpenD-member">
      <div class="member-title">
        <div class="title-left">开放日成员</div>
        <div class="title-right">
          <div>共{{count}}人</div>
          <div class="right-arrows"></div>
        </div>
      </div>
      <div class="member-list">
        <div class="member-item" v-for="item in memberList" :key="item.userId">
          <div class="member-portrait"><img :src="item.portrait"></div>
          <div class="member-userName">
            <div v-if="item.username" class="aa">{{item.username}}</div>
            <div v-else>{{item.userId}}</div>
          </div>
        </div>
        <div class="member-item" @click="SmdShow=true">
          <div class="member-portrait"><img src="../../../static/img/添加.png"></div>
          <div class="member-userName">添加学员</div>
        </div>
      </div>
      <div class="seperate"></div>
      <div class="OpenD-records">
        <div class="records-title">
          <div class="box"></div>
          <span>开放日记录</span>
        </div>
        <div class="records-list">
          <div class="record-item" v-for="item in recordList" :key="item.id" @click="go('/openD-chat',item.id)">
            <div class="id">{{item.id}}</div>
            <div class="time">{{item.startTime}}-{{item.endTime}}</div>
            <div class="ispass" v-if="item.isPass"><img src="../../../static/img/禁止.png"></div>
          </div>
          <div class="add-item" @click="RmdShow=true">
            <div class="addbox"><img src="../../../static/img/添加.png"></div>
          </div>
        </div>
      </div>
      <add-student-m :SmdShow="SmdShow" :OpenId="OpenId" @close="ScloseModal" @reloadMember="reloadMember"></add-student-m>
      <add-record-m :RmdShow="RmdShow" :OpenId="OpenId" @close="RcloseModal" @reloadRecode="getRecordList"></add-record-m>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import AddStudentM from '../../components/AddStudentM'
  import AddRecordM from '../../components/AddRecordM'
  export default {
    name: "",
    data() {
      return {
        OpenId: '',
        memberList: [],
        recordList: [],
        count: '',
        SmdShow: false,
        RmdShow: false,
        title: '',
        portrait: ''
      };
    },
    components: {
      AddStudentM,
      AddRecordM
    },
    mounted() {
      this.OpenId = this.$root.$mp.query.id
      console.log(this.OpenId)
      console.log(this.userOpenD)
      this.userOpenD.forEach((item) => {
        if (item.id == this.OpenId) {
          this.memberList = item.member
          this.memberList.forEach((element) => {
            if (!element.picKey) {
              this.$set(element, 'portrait', "../../../static/img/testimg.jpg")
            } else {
              this.$fly.get(`http://47.107.116.71/files/download/${element.picKey}`).then((res) => {
                this.$set(element, 'portrait', res.data.data)
              })
            }
          })
          this.count = item.member.length
          this.title = item.title
          this.portrait = item.portrait
        }
      })
      this.getRecordList()
    },
    methods: {
      getRecordList() {
        this.$fly.get(`http://47.107.116.71/open_days/record/${this.OpenId}`).then((res) => {
          res.data.data.forEach((item) => {
            this.$set(item, 'startTime', this.timeFormat(item.startTime).replace(/-/g, '/'))
            this.$set(item, 'endTime', this.timeFormat(item.endTime).replace(/-/g, '/'))
            let endTime = new Date(item.endTime)
            let nowTime = new Date()
            if (nowTime > endTime) {
              this.$set(item, 'isPass', true)
            }
          })
          this.recordList = res.data.data
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
      },
      ScloseModal() {
        this.SmdShow = false
      },
      RcloseModal() {
        this.RmdShow = false
      },
      reloadMember() {
        this.$fly.get(`http://47.107.116.71/open_days/user/${this.OpenId}`).then((res) => {
          this.memberList = res.data.data
          this.memberList.forEach((element) => {
            if (!element.picKey) {
              this.$set(element, 'portrait', "../../../static/img/testimg.jpg")
            } else {
              this.$fly.get(`http://47.107.116.71/files/download/${element.picKey}`).then((res) => {
                this.$set(element, 'portrait', res.data.data)
                this.count = this.memberList.member.length
              })
            }
          })
        })
      },
      go(src, id) {
        wx.navigateTo({
          url: `/pages${src}/main?id=${id}`
        });
      }
    },
    computed: {
      ...mapState({
        userOpenD: state => state.userOpenD,
        userInfo: state => state.userInfo
      })
    }

  };

</script>

<style scoped>
  .Detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .OpenD-info {
    position: relative;
    width: 100%;
    height: 400rpx;
    overflow: hidden;
  }

  .OpenD-img {
    position: absolute;
    left: 0;
    right: 0;
    height: 600rpx;
  }

  .OpenD-img>img {
    width: 100%;
    height: 100%;
    filter: blur(10rpx);
  }

  .OpenD-title {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
    font-size: 40rpx;
    color: white;
    font-weight: bold;
  }

  .OpenD-member {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .member-title {
    display: flex;
    height: 60rpx;
    line-height: 60rpx;
    width: 100%;
    border-bottom: 1rpx solid gainsboro;
  }

  .title-left {
    width: 200rpx;
    color: gray;
    font-size: 30rpx;
    margin-left: 10rpx;
  }

  .title-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    color: gray;
    font-size: 30rpx;
  }

  .right-arrows {
    width: 14rpx;
    height: 14rpx;
    border-top: 4rpx solid gray;
    border-right: 4rpx solid gray;
    transform: rotate(45deg);
    position: relative;
    top: 20rpx;
    right: 10rpx;
    margin-left: 10rpx;
  }

  .member-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .member-item {
    width: 20%;
    height: 150rpx;
    position: relative;
  }

  .member-portrait {
    position: absolute;
    left: 20rpx;
    right: 20rpx;
    top: 0;
    height: 110rpx;
  }

  .member-portrait>img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  .member-userName {
    position: absolute;
    left: 10rpx;
    right: 10rpx;
    bottom: 0;
    height: 40rpx;
    line-height: 40rpx;
    font-size: 30rpx;
    color: gray;
    text-align: center;
  }

  .member-userName>div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .seperate {
    width: 100%;
    height: 20rpx;
    background-color: gainsboro;
  }

  .OpenD-records {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .records-title {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    color: gray;
    font-size: 30rpx;
    border-bottom: 1rpx solid gainsboro;
  }

  .box {
    width: 30rpx;
    height: 15rpx;
    background: linear-gradient(to bottom,
      gray 0%,
      gray 0%,
      transparent 20%,
      transparent 40%,
      gray 40%,
      gray 40%,
      transparent 60%,
      transparent 80%,
      gray 100%);
    outline: 1px solid gray;
    outline-offset: 4px;
    display: inline-block;
    margin: 5rpx 20rpx 5rpx 20rpx;
  }

  .records-list {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .record-item {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    color: gray;
    border-bottom: 1rpx solid gainsboro;
    display: flex;
  }

  .id {
    width: 90rpx;
    margin-left: 20rpx;
    margin-right: 20rpx
  }

  .time {
    flex: 1
  }

  .ispass {
    width: 60rpx;
    height: 100%;
  }

  .ispass>img {
    width: 100%;
    height: 100%;
  }

  .add-item {
    display: flex;
    justify-content: center;
    height: 100rpx;
  }

  .addbox {
    width: 100rpx;
    height: 100%;
  }

  .addbox>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

</style>
