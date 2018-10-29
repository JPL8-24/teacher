import Vue from 'vue'
import App from './login.vue'

const app = new Vue(App)
app.$mount()

export default {
  config:{
    navigationBarBackgroundColor: '#ffab02',
    navigationBarTitleText:'登录',
  }
}
