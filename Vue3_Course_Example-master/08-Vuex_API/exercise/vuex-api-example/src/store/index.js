import { createStore } from "vuex";
// import axios from "axios";
import {apiGetPhotoRequest } from "../api";
export default createStore({
  state: {
    photoArr: [],
    idx: 0,
    isLoad: false,
  },
  actions: {
  // es7 async & await
  async  handInit({commit}){
    try{
      const res = await apiGetPhotoRequest();
      console.log(res);
      commit('init', res.data);
      return res.data;
    }catch(error){
      // 現在也能取得後端傳來的錯誤訊息了
      console.error(error.response.data);
      // console.error(error);
      // console.error(error.error);
      // alert(error.error);
    }

    //  return  res.then((response)=>{
    //     commit('init', response.data);
    //     return response.data;
    //   })
     console.log('1');
     // axios 是可以return的
    //  return  axios.get('https://vue-lessons-api.herokuapp.com/photo/list')
    //   .then((res)=> {
    //     console.log('2');
    //     console.log(res.data);
    //     commit('init', res.data);
    //     return res.data;
    //   })
    },
    handLoadState({commit}, bool){
      commit('loadState',bool);
    },
    handAdd({commit}){
      commit('Add');
    },
    andRemove({commit}){
      commit('Remove');
    },
  },
  mutations: {
    init(state, payload){
      state.photoArr = payload;
      console.log('mutations state.photoArr=> ',state.photoArr);
    },
    loadState(state, bool){
      state.isLoad = bool;
    },
    Add(state){
      state.idx++;
      if (state.idx > state.photoArr.length - 1) {
        state.idx = 0;
      }
    },
    Remove(state){
      state.idx--;
      if (state.idx < 0) {
        state.idx = state.photoArr.length - 1;
      }
    },
  },
  getters: {
    isLoad(state) {
      return state.isLoad;
    },
    photoArr(state) {
      return state.photoArr;
    },
    idx(state) {
      return state.idx;
    },
  },
});
