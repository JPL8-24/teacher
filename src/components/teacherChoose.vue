<template>
  <div class="teacher-choose">
    <div class="background"></div>
    <div class="choose-item" @click="changeList" :class="{active:show}">
      <p class="font">所有教师</p>
    </div>
    <div class="choose-item" @click="changeList" :class="{active:!show}">
      <p>在线教师</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "teacherChoose",
    methods:{
      changeList(){
        this.$store.commit('changeOnline')
      }
    },
    computed:{
      show(){
        return this.$store.state.teacherShow
      }
    }
  };
</script>

<style scoped>
  .teacher-choose{
    width: 96%;
    background: white;
    margin: 0 auto ;
    display: flex;
    flex-wrap: wrap;
    border-radius: 20rpx;
    margin-top: 20rpx;
    position: relative;
  }
  .background{
    content: '';
    background-image: url("http://bpic.588ku.com/back_pic/04/76/98/6558ad5a9051beb.jpg");
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
  .choose-item {
    width: 50%;
    text-align: center;
    font-size: 30rpx;
    height: 70rpx;
    line-height: 70rpx;
  }
  .choose-item:nth-child(1){
    border-right: 2rpx solid orange;
    z-index: 2;
  }
  .active{
    color: orange;
  }

</style>
