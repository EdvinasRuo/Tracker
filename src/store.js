import Vue from 'vue'; 
import Vuex from 'vuex'; 

Vue.use(Vuex); 


export const store = new Vuex.Store({
    state:
        { elapsedTime: 0,
        currentTask: null,
        resetCounter: null
        },
    mutations:
        { 
        RESET: state => {
        state.elapsedTime = null, 
        state.currentTask = null,
        state.resetCounter = null
        },
        SET_TASK: (state, payload) => {    
        state.currentTask = payload
        },
        SET_TIME: (state, payload) => {
        state.currentTime = payload    
        },
        SET_ELAPSED: (state, payload) => {
        state.elapsedTime = payload    
        }, 
        SET_RESET: (state, payload) => {
        state.resetCounter = payload    
        },     
        }, 
    getters: { 
        getTask(state){
        return state.currentTask
        },
        getElapsedTime(state) {
        return state.elapsedTime
        }
    }

  
})