<template>
    <div>
    <div class="menuButton" @click="toggleSideMenu">
        <div class="lineStyle"></div>
        <div class="lineStyle"></div>
        <div class="lineStyle"></div>
    </div>
        <ul id="slide-out" class="menuSlide" @click="toggleSideMenu">
            <div class="menuBox">
                <div class="crossCont">
                <i class="material-icons crossStyle">close</i>
                </div>
                <div v-if="user" class="sideInfo">Logged in as user: {{this.user.email}}</div>
                <li v-if = "!user"> <router-link :to="{name:'Welcome'}" class="menuItem"> Home </router-link> </li>
                <li v-if = "!user"> <router-link :to="{name: 'Login'}" class="menuItem">Login</router-link></li>
                <li v-if = "!user"> <router-link :to="{name: 'SignUp'}" class="menuItem"> Sign-up</router-link></li>
                <li v-if = "user" class="menuItem"> <div @click="toMyPage">My Page</div></li>
                <li v-if = "user" class="menuItem"> <div @click="toMyStats">My Dashboard</div></li>
                <li v-if = "user" class="menuItem"> <div @click="logout">Logout</div></li>
            </div>
        </ul>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'SideNav',
    props:['user'], 
    components:{
       
    },
    data() {
        return{

        }
    }, 
    methods:{ 
        toggleSideMenu() {
            var contentId = document.getElementById("slide-out");
            contentId.style.display == "block" ? contentId.style.display = "none" : 
            contentId.style.display = "block";    
        },

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

    
    
}
</script>

<style >

.menuButton{
    cursor: pointer;
    height: 30px;
    left: 25px;
    position: absolute;
    top: 20px;
    width: 36px;
}

.lineStyle{
    height: 13%;
    left: 0;
    right: 0;
    background-color:white;
    margin-bottom: 5px;
}

.menuBox{
    width: 290px;
    height: 100%;
    background-color: #3f3f41; 
}

.menuSlide{
    background-color: rgba(0,0,0,0.6);
    height: 100%;
    width:100%;
    z-index:1000;
    position: absolute; 
    padding-top: 0; 
    margin-top:0; 
    display:none;
}

.menuItem{
    display: flex;
    min-width: 80%;
    min-height: 50px;
    flex-direction: column;
    justify-content: center;
    padding-left:1em;
    text-decoration: none;
    background-color: #00897b;
    font-size: 20px; 
    width: 95%;
    color:#fff;
    margin-left:5%;
}

.sideInfo{ 
    background-color: #fcbfbc;
    cursor: default;
    padding: .7em;
    padding-bottom: 1em;
    font-size: 15px; 
    width: 95%;
    color:rgb(63, 63, 65);
    margin-left:5%;
    padding-right:8px;
    word-wrap: break-word
}

.crossCont{
    text-align: right;
    padding-right:0.5em;
}

.crossStyle{
    color:white;
    padding-bottom:1em;
    margin-top:0.7em;
   
}
.crossStyle:hover{
    cursor: pointer;
}



</style>


