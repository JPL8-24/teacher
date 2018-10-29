<template>
  <div class="container">
    <TopBar></TopBar>
    <NewsList :list="newsList"></NewsList>
  </div>
</template>

<script>
  import TopBar from '../../components/NewsTopbar'
  import NewsList from '../../components/NewsList'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: "index",
    data(){
      return{
        AppKey:'0748e6ffc8207a34a953a998c0e81c7c',
        list:[ ]
      }
    },
    computed:{
      ...mapState({
        newsList:state=>state.newsList,
        channel:state=>state.channel
      })
    },
    watch:{
      channel:function(newval,oldval) {
        this.getNews(newval)
      }
    },
    components:{
      NewsList,
      TopBar
    },
    mounted(){
        this.getNews(this.channel)
    },
    methods:{
      getNews(name){
        wx.showLoading({
          title:'正在加载中QAQ',
          icon:'success'
        })
        this.$fly.get(`https://v.juhe.cn/toutiao/index?type=${name}&key=${this.AppKey}`).then(this.getnewsSucc)
      },
      getnewsSucc(res){
        let result=Array.prototype.slice.call(res.data.result.data)
        this.changeNewsList({result})
        wx.hideLoading()
      },
      ...mapMutations([
        'changeNewsList'
      ])
    },
    onPullDownRefresh:function() {
      wx.setNavigationBarTitle({
        title: '刷新数据中！'
      });
      wx.showNavigationBarLoading();
      this.getNews(this.channel)
      wx.hideNavigationBarLoading();                   //完成停止加载
      wx.setNavigationBarTitle({
        title: '新闻资讯'
      });
      wx.stopPullDownRefresh();

    }
  };
</script>

<style scoped>
  .container{
    width: 100%;
    margin:0;
    padding:0;
    box-sizing: border-box;
    display: flex;
  }
  .news-item{
    width: 100%;
    display: flex;
    border-bottom: 2rpx solid #e0e0e0;
  }
</style>
