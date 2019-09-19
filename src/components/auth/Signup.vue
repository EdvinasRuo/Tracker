<template>
    <div class="signup container">
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center blue-grey-text">Sign-up</h2>
                <div class="field">
                    <label for="email">Email:</label>
                    <input type="email" name="email" v-model="email">
                </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="errorMessage" v-if="feedback">{{feedback}}</p>
            <p class="savedMessage " v-if="confirmation"> {{confirmation}}</p>
            <div class="field center">
                <button class="btn blue-grey">Sign-up</button>  
            </div>
        </form>
    </div>
</template>

<script>
import Main from '../CounterPage/Main'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data() {
        return {
            email: null, 
            password: null,
            feedback: null,
            confirmation: null,
        }
    },
    methods: {
        signup() {
            if( this.email && this.password) { 
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.feedback= null
                    this.confirmation = "Your user has been saved."
                    //redirect
                    this.login()
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                        })
            } else {
                this.confirmation = null
                this.feedback ="You must enter all fields"
                        }
                }, 

        login() {
        if(this.email && this.password) {
            this.feedback=null
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(cred => { 
                console.log(cred.user)
                this.$router.push({name: 'CounterPage'})
                this.$router.push({params: { email: this.email}})
            }).catch(err => {
                this.feedback = err.message
            })

        } else {
            this.feedback="You must enter email and password"
        }
        }
    }
}
</script>

<style>
.signup{
    max-width: 500px; 
    margin-top: 60px; 

}
.signup h2 {
    font-size: 2.4em; 
}

.signup .field{ 
    margin-bottom: 16px; 
}

.savedMessage { 
    background-color: #66bb6a;
    color: white; 
    border-style: solid; 
    padding-left: 1%; 
}

.errorMessage {
    background-color: #d32f2f;
    color: white;
    border-style: solid; 
    padding-left: 1%;
}

</style>

