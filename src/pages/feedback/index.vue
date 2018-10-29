<template>
  <div class="container">
    <div class="content">请填写你的反馈</div>
    <div class="form">
      <form>
        <div class="section">
          <input placeholder="请输入标题" :placeholder-style="style"/>
        </div>
        <div class="section">
          <picker :range="array" :value="index" @change="handleChange">
            <span class="picker-text">请选择类型：</span><span class="picker-text">{{array[index]}}</span>
          </picker>
        </div>
        <div class="section1">
          <textarea class="textarea" placeholder="请输入反馈内容" :placeholder-style="style2">
          </textarea>
        </div>
        <button type='submit'  class="submit-button">提交反馈</button>
      </form>
    </div>
    <div class="info">
      感谢您的反馈，您的反馈将返回我们后端服务器。开发团队将会根据你们的反馈做出相关的优化，谢谢反馈！
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        style:'font-size:28rpx;padding-top:4rpx',
        style2:'font-size:28rpx;margin-top:10rpx',
        array:['bug','功能建议','其他'],
        index:0
      }
    },
    methods:{
      handleChange(e){
        this.index=e.target.value
      }
    }

  };
</script>

<style scoped>
.container{
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
}
  .content{
    width: 100%;
    font-size: 26rpx;
    color: #909090;
    padding:10rpx 0 10rpx 25rpx;

  }
  .form{
    width: 100%;
    background: white;
  }
  .section{
    width: 100%;
    border-bottom: 2rpx solid rgba(221,221,221,0.6);
    border-top:2rpx solid rgba(221,221,221,0.6);
    height: 60rpx;
  }
  .picker-text{
    font-size: 30rpx;
    color: #909090;
  }
  .section1{
    width: 100%;
    border-bottom: 2rpx solid rgba(221,221,221,0.6);
    border-top:2rpx solid rgba(221,221,221,0.6);
    height: 300rpx;
  }
  .textarea{
    width: 100%;
  }
  .info{
    color: #909090;
    font-size: 26rpx;
  }
  .submit-button{
    position: fixed;
    bottom:0;
    background: #ffab02;
    width: 100%;
    color: white;
  }
</style>
