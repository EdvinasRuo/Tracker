<template>
    <div>
        <span id="renderTimer" v-html="renderTimer" class="card-panel clock "></span>
        <div>
            <button @click="startCount" 
                class="waves-effect waves-light btn-small buttonStyle" 
                :disabled="!this.$store.state.currentTask 
                || this.$store.state.elapsedTime> 1  
                && !this.paused ">
                    {{ this.pausedValue > 0 && this.paused  
                    ? 'Continue' 
                    : 'Start'}}
            </button> 
            <button @click="resetCount" 
                class="waves-effect waves-light btn-small buttonStyle" 
                :disabled="!this.$store.state.currentTask"> 
                Reset 
            </button>
            <button @click="stopCount" 
                class="waves-effect waves-light btn-small buttonStyle" 
                :disabled="!this.$store.state.currentTask || this.paused "> 
                Pause 
            </button>
        </div>
    </div>
</template>

<script>

export default {
       name: 'Clock', 
       components: { 
           
       },

       data() {
           return { 
            interval: null,
            now: null, 
            startTime: null,
            paused: true, 
            pausedValue: null,
            elapsedTime: null,  
           }
       },

computed: {
    renderTimer() {
    return  this.hours +' : '+ this.minutes +' : '+ this.seconds
    }, 

    seconds() {
    var lapsed = this.$store.state.elapsedTime;
    var sec = Math.ceil((lapsed / 1000) % 60);
    return sec >= 10 ? sec : '0' + sec;
    },

    minutes() {
    var lapsed = this.$store.state.elapsedTime;
    var min = Math.floor((lapsed / 1000 / 60) % 60);
    return min >= 10 ? min : '0' + min;
    },

    hours: function() {
    var lapsed = this.$store.state.elapsedTime;
    var hrs = Math.floor((lapsed / 1000 / 60 / 60));
    return hrs >= 1 ? hrs : '0' + hrs;
    }
}, 

methods: { 

    update() {
    // Check if upload to DB button was clicked
    if(this.$store.state.resetCounter) { 
        this.resetCount();
    }
    if(!this.paused) {
        this.now = Date.now(); 
        this.elapsedTime = this.now - this.startTime + this.pausedValue;
    // Store elapsed time in Vuex
    this.$store.commit('SET_ELAPSED', this.elapsedTime)
        }
    }, 

    startCount() {   
    
    this.paused = false; 
    this.startTime = Date.now(); 
    
    }, 

    stopCount() { 
    this.pausedValue = this.elapsedTime; 
    this.paused = true; 
    
    
    }, 

    resetCount() { 
    this.paused = true; 
    this.pausedValue = null; 
    this.elapsedTime = null;
    this.startTime = null; 
    this.startTime = Date.now();
    this.$store.commit('RESET');
    this.$store.commit('SET_RESET', false);
    }

}, 

mounted() { 
this.interval = setInterval(this.update, 1000)
},
destroyed() { 
clearInterval(this.interval)
}
}

</script>



<style>
#renderTimer {
    display: block;
    font-size: 1.5em;
}

.buttonStyle{ 
    margin-right: 5px; 
    margin-top: 5px; 
}

.clock {
   color: #009688 ;
   background-color: #eceff1 ; 
   max-width: 180px; 
   text-align: center;
}



</style>

