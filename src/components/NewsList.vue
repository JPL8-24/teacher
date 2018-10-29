<template>　
  <div class="container" >
    <div class="news-item" v-for="item in newsList" :key="item.uniquekey" @click="goTo(item.url)">
      <div class="news-content">
        <h3 class="dothot">
          {{item.title}}
        </h3>
        <div class="list-img">
          <ul class="clearfix">
            <li class="list-img-holder">
              <img :src="item.thumbnail_pic_s">
            </li>
            <li class="list-img-holder">
              <img :src="item.thumbnail_pic_s02">
            </li>
            <li class="list-img-holder">
              <img :src="item.thumbnail_pic_s03">
            </li>
          </ul>
        </div>
        <div class="item-info">
          <span class="info">{{item.author_name}}</span>
          <span class="info">{{item.date}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "NewsList",
    data(){
      return{

      }
    },
    props:['list'],
    computed:{
      ...mapState({
        newsList:state=>state.newsList,
        show:state=>state.teacherShow
      })
    },
    mounted(){
    },
    methods:{
      goTo(params){
        let index = params.indexOf('http')
        let newparams=params.replace(/http/,'https')
        wx.navigateTo({
          url:`/pages/NewsDetail/main?src=${newparams}`
        })
      }
    }
  };
</script>

<style scoped>
.container{
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  top: 80rpx;
}
  .news-item{
    position:relative;
    margin: 0 30rpx;
    border-bottom: 2rpx solid rgba(221,221,221,0.6);
    min-height:360rpx;
  }
  .news-content{
    position:relative;
    padding:32rpx 0;
  }
  .dothot{
    font-size: 34rpx;
    line-height: 42rpx;
    font-weight: normal;
  }
  .list-img{
    margin-top:12rpx;
  }
  .clearfix{
    display: block;
    margin:0;
    padding:0;
    list-style-type: none;
    text-align: center;
  }
  .list-img-holder{
    float: left;
    padding-right: 4rpx;
    display: inline-block;
    overflow: hidden;
    width: 33.3%;
    box-sizing: border-box;
    position: relative;
    height: 200rpx;
  }
  .list-img-holder>img{
    border: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  .clearfix::after{
    content: " ";
    clear: both;
    display: block;
    visibility: hidden;
    height: 0;
    font-size: 0;
  }
  .item-info{
    color:#999;
    overflow: hidden;
    margin-top:12rpx;
  }
  .info{
    font-size: 24rpx;
    padding-right: 24rpx;
    line-height: 24rpx;
  }

</style>
