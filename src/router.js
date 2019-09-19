import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Welcome from './components/Welcome'
import Counter from './components/CounterPage/Main'
import SignUp from './components/auth/Signup'
import Login from './components/auth/Login'
import AllStats from './components/CounterPage/AllStats'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
      path:'/counter/:email',
      name:'CounterPage', 
      component: Counter,
      props: true,
      meta: { 
        requiresAuth: true,
      },  
    },
    {
      path:'/counter/:email/AllStats',
      name:'AllStats', 
      component: AllStats,
      props: true,
      meta: { 
        requiresAuth: true,
      },  
    },


    {
      path:'/signup',
      name:'SignUp', 
      component: SignUp,
    },

    {
      path:'/login',
      name:'Login', 
      component: Login,
    },

    {
      path:'*',
      redirect: "/"
    },
  
    ]
  })

  router.beforeEach((to, from, next) => {
    //check to see if route requires auth 
    if(to.matched.some(rec => rec.meta.requiresAuth)) {
      // check auth state of user 
      let user = firebase.auth().currentUser
      if(user) {
        //user signed in, proceed to route
        next()
      } else {
        // no user signed in , redirect to lobby 
        next({ name: 'Login'})
      }
    } else {
      next()
    }
  
  }
  )
  
  // Stay on Counter page on refresh 
  let user = firebase.auth().currentUser
  firebase.auth().onAuthStateChanged((user) => {
    //console.log("On Auth State Changed")
      if (!user) {
       // console.log("No existing user");
        router.replace({ name: 'Welcome'}); 
      } else{
      //  console.log("Session "+user.email);
        router.push({name: 'CounterPage', params: {email: user.email}})
      }
  });
  
 export default router; 