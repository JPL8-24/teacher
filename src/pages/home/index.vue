<template>
    <div class="container">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="1000" circular="true">
        <block v-for="(item, index) in movies" :index="index" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" mode="aspectFill"/>
          </swiper-item>
        </block>
      </swiper>
      <icon-list></icon-list>
      <teacher-list></teacher-list>
    </div>
</template>

<script>
  import IconList from '../../components/IconList'
  import TeacherChoose from '../../components/teacherChoose'
  import TeacherList from '../../components/teacherList'
  export default {
    name: "index",
    data(){
      return{
        movies:["/static/img/1.png",
            "/static/img/2.png",
          "/static/img/3.png"
        ]
      }
    },components:{
      IconList,
      TeacherChoose,
      TeacherList
    },
    methods: {
      
    },
    mounted () {
      
    }
  };
</script>

<style scoped>
  .container{
    box-sizing: border-box;
    background-color:white;
    height: 100vh;
    width: 100%;
  }
.swiper{
  width: 100%;
  position:relative;
  top:0;
  height: 330rpx;

}
  .slide-image{
    width: 100%;
    height:100%
  }
  
</style>
