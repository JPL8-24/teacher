<template>
  <div class="container">
    <div class="background"></div>
    <div class="member" v-for="item in members" :key="item.id">
      <div class="img">
        <img :src="item.url"/>
      </div>
      <div class="content">
        <div class="item">{{item.name}}</div>
        <div class="item">{{item.type}}</div>
        <div class="item">{{item.work}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        members:[{
          url:'http://bpic.588ku.com/element_origin_min_pic/18/06/09/398793344ac52e8ac8cf95b356a873ff.jpg',
          name:'姜潘磊',
          type:'四川大学 软件工程 2015级',
          work:'前端页面制作和数据交互',
          id:1
        },{
          url:'http://bpic.588ku.com/element_origin_min_pic/18/06/09/49a4bc18d94efa1fd0fa1534d5021f6a.jpg',
          name:'刘艺伟',
          type:'四川大学 软件工程 2015级',
          work:'后端服务器和数据库制作',
          id:2
        },{
          url:'http://bpic.588ku.com/element_origin_min_pic/18/06/10/b340d25c07fe1a7207243e75d84b34ab.jpg',
          name:'黄伟',
          type:'四川大学 软件工程 2015级',
          work:'后端服务器和数据库制作',
          id:3
        }
        ]
      }
    }
  };
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    margin:0;
    padding:0;
    box-sizing: border-box;
    position:relative;
  }
  .background{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:-30rpx;
    background-image: url("http://bpic.588ku.com/back_pic/05/01/12/91594b46d626f9a.jpg");
    background-size: 100% 100%;
    filter: opacity(20%);
  }
  .member{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 96%;
    border-radius: 6rpx;
    background: white;
    filter: opacity(100%);
    top: 20rpx;
    margin: 0rpx auto 40rpx auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .img{
    position: relative;
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    margin: 0 auto;
  }
  .img>img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .content{
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 20rpx 40rpx;
    text-align: center;
    border-top: 2rpx solid rgba(221,221,221,0.6);
    font-size: 30rpx;
    color: #474747;
    font-weight: bold;
  }
  .item{
    margin: 5rpx auto;
  }

</style>
