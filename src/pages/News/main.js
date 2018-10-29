import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config:{
    navigationBarTitleText:'新闻资讯',
    navigationBarBackgroundColor: '#ffab02',
    enablePullDownRefresh:true
  }
}
