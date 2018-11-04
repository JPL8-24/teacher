import Vue from 'vue'
import App from './App'
import store from './store/index'
import tool from './utils/index'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
let token=wx.getStorageSync('token')
Vue.prototype.$fly = fly
fly.interceptors.request.use((req)=>{
  if(token){
    req.headers={
      "token":token
    }
  }else{
    return req
  }
})
Vue.prototype.$store=store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/Login/main','pages/info/main','pages/home/main','pages/News/main','pages/aboutUs/main','pages/feedback/main',
    'pages/NewsDetail/main','pages/openD-chat/main','pages/AllOpenD/main','pages/OpenD-detail/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh:true
    },
    tabBar:{
      color:"#222",
      selectedColor:"#ffab02",
      backgroundColor:'#fff',
      list:[
        {
          text:"首页",
          pagePath:'pages/home/main',
          iconPath:"/static/img/首页.png",
          selectedIconPath:"/static/img/首页的副本.png"
        },
        {
          text:"新闻资讯",
          pagePath:'pages/News/main',
          iconPath:"/static/img/书本.png",
          selectedIconPath:"/static/img/书本1.png"
        },
        {
          text:"个人中心",
          pagePath:'pages/info/main',
          iconPath:"/static/img/个人中心.png",
          selectedIconPath:"/static/img/个人中心1.png"
        }
      ]
    }
  }
}
