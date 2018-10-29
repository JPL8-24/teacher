<template>
    <div>
      <web-view :src="src"></web-view>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        src:''
      }
    },
    onShow(options){
      this.src=this.$root.$mp.query.src
      console.log(this.src)
    }
  };
</script>

<style scoped>

</style>
