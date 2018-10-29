<template>
    <div class="top-bar">
      <div class="bar-items" @click="change('top')" >
        <img src="../../static/img/全部.png" class="icon" >
        <a class="btn">全部</a>
      </div>
      <div class="bar-items" @click="change('shehui')">
        <img src="../../static/img/社会.png" class="icon">
        <a class="btn">社会</a>
      </div>
      <div class="bar-items" @click="change('guonei')">
        <img src="../../static/img/国内游.png" class="icon">
        <a class="btn">国内</a>
      </div>
      <div class="bar-items" @click="change('yule')">
        <img src="../../static/img/娱乐.png" class="icon">
        <a class="btn">娱乐</a>
      </div>
      <div class="bar-items" @click="change('tiyu')">
        <img src="../../static/img/体育.png" class="icon">
        <a class="btn">体育</a>
      </div>
      <div class="bar-items" @click="change('junshi')">
        <img src="../../static/img/军事.png" class="icon">
        <a class="btn">军事</a>
      </div>
      <div class="bar-items" @click="change('keji')">
        <img src="../../static/img/科技.png" class="icon">
        <a class="btn">科技</a>
      </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "NewsTopbar",
    methods:{
      ...mapMutations([
        'changeChanel'
      ]),
      change(channel){
        this.changeChanel({channel})
      }
    }
  };
</script>

<style scoped>
.top-bar{
  box-sizing: border-box;
  background: #f4f5f6;
  height: 80rpx;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  display: flex;
  overflow-x:scroll ;
}
.bar-items{
  margin-left: 30rpx;
  position:relative;
  width: 100rpx;
}
  .btn{
    white-space: nowrap;
    display: inline-block;
    padding-left: 30rpx;
    padding-right: 20rpx;
    text-decoration: none;
    font-size: 34rpx;
    line-height: 52rpx;
    height: 52rpx;
    margin:10rpx 0 10rpx 10rpx ;
  }
  .icon{
    position: absolute;
    left: 0;
    top:16rpx;
    height: 40rpx;
    width: 40rpx;

  }

</style>
