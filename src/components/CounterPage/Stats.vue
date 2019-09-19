<template>
    <div >
        <p>Quick-Stat-Dashboard</p>
        <div class="statsContainer">
            <p>Todays time counted: </p>
            <p class="card-panel clock">{{hours(this.todaysTime)}} : {{minutes(this.todaysTime)}} : {{seconds(this.todaysTime)}} </p>
        </div>
        <div class="statsContainer">
            <p>This week's time counted: </p>
            <p class="card-panel clock">{{hours(this.weeksTime)}} : {{minutes(this.weeksTime)}} : {{seconds(this.weeksTime)}} </p>
        </div>
       
    </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'


export default {
name: 'StatsPage', 
components: {
   
    },
    data() {
        return{ 
        usersTasks: [], 
        todaysTime: null,
        weeksTime: null
        }
    }, 
    created() {

        // Listen if new tasks been added in the DB for current user 
        let ref2 = db.collection('tracking')

        ref2.onSnapshot(snapshot => { 
        snapshot.docChanges().forEach(change => {
            if(change.type == 'added' && change.doc.data().to == this.$route.params.email ) {
            let doc = change.doc
        this.usersTasks.push(doc.data())
        
            }
        })
        this.findTodaysTasksTime()
        this.findWeeksTimeSpent()
        })
    }, 

    beforeUpdate() { 
        this.usersTasks = [ ]
    },

    methods:{ 
        findTodaysTasksTime() { 
            var filteredTasks = []
            this.usersTasks.forEach(element => {
                if(element.dateStamp === moment(Date.now()).format('L') ) {
                    filteredTasks.push(element)
                    }
                })
            // Sum the seconds of todays tasks 
            filteredTasks.forEach(task=> {
                this.todaysTime += task.timeSpent    
                })

        }, 

        findWeeksTimeSpent() {
            var weeksFilteredTasks = []
            this.usersTasks.forEach(element => {
                if(element.weekStamp === moment(Date.now()).format('W') ) {
                weeksFilteredTasks.push(element)
                }
            })
            // Sum the seconds of weeks tasks 
            weeksFilteredTasks.forEach(task=> {
                this.weeksTime += task.timeSpent
                })

        }, 

        seconds(time) {
            var lapsed = time ;
            var sec = Math.ceil((lapsed / 1000) % 60);
            return sec >= 10 ? sec : '0' + sec;
        },

        minutes(time) {
            var lapsed = time ;
            var min = Math.floor((lapsed / 1000 / 60) % 60);
            return min >= 10 ? min : '0' + min;
        },

        hours(time) {
            var lapsed = time ;
            var hrs = Math.floor((lapsed / 1000 / 60 / 60));
            return hrs >= 10 ? hrs : '0' + hrs;
        }

    },


}
</script>


<style>
p {
    font-size: 1.5em;
}

.statsContainer{
    display: inline-block;
    padding-right: 3%;
}

</style>


