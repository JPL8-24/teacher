import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    newsList:[],
    channel:'top',
    userInfo:{},
    userOpenD:[],
    AllOpenD:[],
    recordId:'',
    globalSoket:''
  },
  actions:{

  },
  mutations:{
    changeNewsList(state,payload){
      state.newsList.pop()
      if(payload.channel){
        state.channel=payload.channel
      }
      state.newsList=payload.result.slice();
    },
    changeChanel(state,payload){
      state.newsList.pop()
      state.channel=payload.channel
    },
    saveUserInfo(state,payload){
     state.userInfo= Object.assign(state.userInfo,payload)
    },
    saveUserOpenD(state,payload){
      state.userOpenD=payload.slice()
      console.log(state.userOpenD)
    },
    addUserId(state,payload){
      Object.assign(state.userInfo,{
        userId:payload.userId
      })
      console.log(state.userInfo)
    },
    changeRecord(state,id){
      state.recordId=id
      console.log(state.recordId)
    },
    saveglobalSoket(state,globalSoket){
      state.globalSoket=globalSoket
      console.log(state.globalSoket)
    }
  }
})
