<template>
    <div class="navbar">
        <SideNav :user=user class="sideNav"/>
        <nav class="teal darken-1">
            <div class="container">
                <router-link to= "/" class="brand-logo left titleName">Time-Tracker App</router-link>  
                <ul class="right navBar">
                    <li v-if = "!user"> <router-link :to="{name: 'SignUp'}">Sign-up</router-link></li>
                    <li v-if = "!user"> <router-link :to="{name: 'Login'} ">Login</router-link></li>
                    <li v-if = "user"> <a @click="toMyPage">My Page</a></li>
                    <li v-if = "user"> <a @click="toMyStats">My Dashboard</a></li>
                    <li v-if = "user"> <a @click="logout">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
    
</template>
<script>

import firebase from 'firebase'
import SideNav from './SideNav'

export default {
    components:{
    SideNav
    },
    name: 'Navbar',
    data() {
        return{ 
            user: null
        }
    },
    methods: {

        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push({name: 'Welcome'})
            })
        }, 

        toMyPage() { 
            this.$router.push({name: 'CounterPage', params: {email: this.user.email}})
        }, 

        toMyStats() {
            this.$router.push({name: 'AllStats', params: {email: this.user.email}})
        }
    },
    created() { 
        firebase.auth().onAuthStateChanged((user) => { 
            if(user) { 
                this.user = user
            } else {
                this.user = null 
            }
        })
    }
}
</script>

<style>




@media only screen and (max-width: 999px) {


    .navBar {
        display: none; 
    }

    .titleName{
        margin-left: 85px;    
    }

}

@media only screen and (min-width: 1000px) {

    .sideNav {
     display: none; 
    }

    .navBar {
     display:block;
    }

    .titleName{
     margin-left: 0;    
    }
}

/*iki 600px*/ 
@media only screen and (max-width:599px) {
    .titleName{
        margin-left: 50px;

    }

    .menuButton {
        cursor: pointer;
        height: 30px;
        left: 15px;
        position: absolute;
        top: 18px;
      
    }

    .crossStyle{
      
        margin-top:0.32em;
    
    }
    

}
/*daugiau uz 600px*/
@media only screen and (min-width:600px) {
     .titleName{
          margin-left: 65px;

    }



}

/*daugiau uz 1000*/
@media only screen and (min-width:1000px) {
     .titleName{
         margin-left: 0px;

    }


}

</style>

