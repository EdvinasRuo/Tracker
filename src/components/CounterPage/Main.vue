<template>
<div class="background z-depth-2 container"> 
    <div class="mainContent">
        <h4>My Tracker Page</h4>
        <div>User - {{this.$route.params.email}}</div>
        <div class="topHorizonalLine"/>
        <div class="row">
                <div class="col s12 m12 l6"> 
                    <div class="stepsContainer">
                        <p>Follow the steps to start:</p>
                        <i class="material-icons stepsElement">
                            looks_one 
                        </i> 
                        <p class="stepsElement">
                            Select a task to begin 
                        </p>
                        <TaskPage/> 
                    </div>
                    <div class="stepsContainer"> 
                        <i class="material-icons stepsElement">
                            looks_two 
                        </i> 
                        <p class="stepsElement">
                            Start timer to track progress
                        </p>
                        <Clock/>
                    </div>
                    <div class="stepsContainer">
                        <i class="material-icons stepsElement">
                            looks_3 
                        </i> 
                        <p class="stepsElement">
                            Save progress
                        </p>
                    </div >
                    <div class="buttonCont">
                        <button class='waves-effect waves-light btn' 
                            @click="uploadTask" 
                            :disabled="!this.$store.state.elapsedTime">
                            Upload current progress
                        </button>
                    <p v-if="feedback" class="errorMessage">{{ feedback }}</p>
                    <p v-if="confirm" class=" savedMessage">{{ confirm }}</p>
                    </div>
                </div>
            <div class="col s12 m12 l6">
                <div class="verticalLine" ></div>
                <div class="bottomHorizonalLine"/>
                <Stats /> 
            </div>
        </div>

        </div>
</div>
</template>

<script>
import Clock from './Clock'
import TaskPage from './TaskPage'
import db from '@/firebase/init'
import Stats from './Stats'
import moment from 'moment'

export default {
    name:'CounterPage', 
    components: { 
        Clock,
        TaskPage,
        Stats
    },
    
    data() {
    return{
        profile: null,
        feedback: null,
        confirm: null
        }
    },
    methods: {

    uploadTask() { 

        if(this.$store.state.currentTask) {
            this.feedback = null 
                db.collection('tracking').add({
                to: this.$route.params.email,
                task: this.$store.state.currentTask,
                timeSpent:  this.$store.state.elapsedTime, 
                dateStamp: moment(Date.now()).format('L'),
                timeStamp: moment(Date.now()).format('LT'),
                weekStamp: moment(Date.now()).format('W')
                
                }).then(() => {
                    // reset state in the vuex 
                    this.$store.commit('RESET')
            
                    this.$store.commit('SET_RESET', true);
                    // feedback to user if saved to DB 
                    this.confirm = 'Your progress has been saved!'
                    setTimeout(()=> {
                    this.confirm = null
                    }, 4500)
                    })

            } 
        else { 
        this.feedback = 'You have to assign a task and count some time to upload it to Database'
        }
    },

    },

}
</script>

<style scoped>


.stepsElement {
    display: inline;
    font-size: 1.5em;
}

.stepsContainer{ 
    margin-top: 30px; 
}

.meniuElement{
    padding-top: 15px;

}

.buttonContainer{
    padding-top: 15px;
    padding-bottom: 20px; 

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

.background { 
    background-color: white; 
}

.verticalLine{
    width: 2px;
    background-color: silver;
    height: 70vh;
    float: left;
    margin-right: 5%; 
}

.bottomHorizonalLine{
    height: 2px;
    background-color: silver;
    width: 100%;
    float: left;
    margin-right: 5%; 
    margin-top: 5%;
    margin-bottom:5%;
}

.topHorizonalLine{
    height: 2px;
    background-color: silver;
    width: 100%;
    float: left;
    margin-right: 5%; 
    margin-top:2%;
}

.mainContent{
    margin-top: 3%; 
    margin-left: 2%;
    margin-right: 2%;
    padding-bottom: 1%;
    padding-top: 1%;

}

@media only screen and (min-width:993px) {
.bottomHorizonalLine{
    display:none; 
}



}

@media only screen and (max-width:993px) {
.verticalLine{ 
    display: none;
}
}


</style>






