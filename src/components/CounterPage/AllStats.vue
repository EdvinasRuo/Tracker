<template>
  <div class="statsPage container ">
    <ul class="collection z-depth-2 ResultCard" id="show">
      <p v-if="SortedTasks[0]==null">There are no records yet. Go to <a @click="toMyPage" class="redirectLink">My Page </a> to start. </p>
      <li v-for="(year, index) in SortedTasks" :key="index" class="collection-item " >
      <div>
        <div class="row">
          <div class="yearBox">
            <div class="yearName col s2 m6 l6">Year {{year.year}}</div> 
            <div class="totalHours col s10 m6 l6">Total this year: {{showYearsHours(year.tasks)}}</div>
          </div>
          <div v-for="(week, index) in year.tasks" :key="index">
          <li class="collection row" v-if="week[0]">
              <button class="waves-effect waves-light btn col s0.1 m0.1 l0.01">
               <i @click="toggleWeeks(index, year.year)" class="material-icons small">more_horiz</i>
              </button>
              <div>
                <div class="col s5 m3 l5 weekInfo">Week {{week[0].weekStamp}}</div>
              </div>
              <div class="weekTotalHours col s6.9 m8.9 l6.9">Total: {{showTotalHours(week)}}</div> 
              <div :id="year.year + index" class="toggleView">     
                <table>
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in showWeeksStats(week)" :key="index" class="weekInfoBox">
                      <td>{{task.task}}</td>
                      <td>{{formatTime(task.totalTime)}}</td>
                    </tr>
                  </tbody>
                  </table>             
                  <Charts :week=showWeeksStats(week) />
                </div>
              </li>
            </div>
          </div>
      </div>  
     </li>
   </ul>
  </div>
</template>

<script>
import db from '@/firebase/init'
import Charts from './Charts'

export default {
    name:'AllStats',
    components:{
    Charts
    },
    
data() {
    
    return{
    AllUsersTasks: [],
    SortedTasks: [],
    AllWeeks:[], 
    
    }
}, 

created() {
// Listen if new tasks been added in the DB for current user 
  let ref3 = db.collection('tracking')

  ref3.onSnapshot(snapshot => { 
    snapshot.docChanges().forEach(change => {
        if(change.type == 'added' && change.doc.data().to == this.$route.params.email ) {
        let doc = change.doc
        return this.AllUsersTasks.push(doc.data())
          }
      })

    this.sortAllTasks()
    
  })

  },


methods: {
  
  sortAllTasks() { 

    // Sort arrays acconding years and weeks
    var resultYears =[]

    this.AllUsersTasks.forEach((task) => {
      resultYears.push(task.dateStamp.substring(6))
      })
    var existingYears = [...new Set(resultYears)]
    this.YearsforRender = existingYears

    var myResult = existingYears.map(year => {

      return {
        year:year,

        weeks: this.AllUsersTasks.filter((task) => {
          if ( this.AllWeeks.indexOf(task.weekStamp) === -1 ) {
            this.AllWeeks.push(task.weekStamp)
            }
            this.AllWeeks.sort()
          }),
              
        tasks: this.AllWeeks.map((week) => {
          var o = [];
          this.AllUsersTasks.map((task) => {
                
            if(task.weekStamp === week  && year === task.dateStamp.substring(6)) {
              o.push(task)
              }
            if( o.lenght > 0) {  
              return o
              }
          })
          return o
          })  
        }
      })

    this.SortedTasks = myResult
  },

  showWeeksStats(stats) { 
  var weeksTasks = []
  var res = {}
  var times = []
  var result = []
  var totalTime = null

  //all existing weeks
  stats.forEach((task) => { 
    if(weeksTasks.indexOf(task.task) === -1){
      weeksTasks.push(task.task)
      }})

  //add task and times into one week object
  weeksTasks.map((existingTask) => {
    res = { }
    stats.filter((task) => {

      //get array of times per task 
      if(task.task === existingTask ) {
        times.push(task.timeSpent)
        totalTime += task.timeSpent
        }
      //add data per task to an obj 
      res.times = times
      res.task = existingTask
      res.totalTime = totalTime

      return res
      })
    times =[]
    totalTime = null 

    // add all objects to an array 
    result.push(res)
    return result
    })

  return result
  },


formatTime(time) {
  var lapsed = time     

  var hrs = Math.floor((lapsed / 1000 / 60 / 60))
  var min = Math.floor((lapsed / 1000 / 60) % 60)
  var sec = Math.ceil((lapsed / 1000) % 60);

  hrs = hrs + ' h - '
  min = min + ' min - '
  sec = sec + ' sec'

  return hrs + min  + sec
  }, 

formatTotalHours(time) {
  var lapsed = time     

  var hrs = Math.floor((lapsed / 1000 / 60 / 60))
  // Formating hours
  if(hrs < 1) {
    hrs = '< 1 hour'
  }
  if(hrs == 1) {
    hrs = hrs + ' hour ' 
  }
  if(hrs > 1 ) {
    hrs = hrs + ' hours '
  }
  return hrs
}, 

showTotalHours(week){
  var weeksTime = null
  week.map((task) => {
    weeksTime += task.timeSpent
    })
  return this.formatTime(weeksTime) 
},

showYearsHours(tasks) {

  var yearsTime = null
  tasks.map((week) => {
    week.map((task) => {
      yearsTime += task.timeSpent
    })
    return yearsTime
  })
  return this.formatTotalHours(yearsTime)
},  

toggleWeeks(index, year) {
  var id = year + index 
  var contentId = document.getElementById(id);
  contentId.style.display == "block" ? contentId.style.display = "none" : 
  contentId.style.display = "block"; 
  },

toggleView() {
  var contentId = document.getElementById("show");
  contentId.style.display == "block" ? contentId.style.display = "none" : 
  contentId.style.display = "block";    
  window.scrollTo(0,document.body.scrollHeight);

}, 

toMyPage() { 
  this.$router.push({name: 'CounterPage', params: {email: this.$route.params.email}})
}, 

}, 
}

</script>

<style>

.yearName {
  color: #607d8b; 
  font-size: 1.25em;
}

.weekName:hover { 
  color:#4db6ac; 
  cursor: pointer;

}

.weekName{
  padding-left: 2%; 
  color: #607d8b; 
  font-size: 1.25em;
  padding-top: 5px;
  display: inline-block;
}

.weekInfo { 
  display: inline-block;
  color: #607d8b; 
  font-size: 1.25em;
  padding-right: 3px;
  
}

.weekTotalHours{
  display: inline-block;
  color: #607d8b; 
  font-size: 1.25em;
  justify-items:right

}

.weekInfoBox{
  margin-right: 2%;
  cursor: auto; 
}

.toggleView{
  display:none
}

.taskText{ 
  display: inline;
  color: black;

}

.timeText {
  display: inline ; 
  color: black;
  
}

.statsPage { 
  padding-bottom: 3%;
  padding-top: 1%; 
  
}

.totalHours {
  display: inline-block;
  color: #607d8b; 
  font-size: 1.25em;
  text-align: right;

}

.yearBox {
  padding-bottom: 35px;
}

.ResultCard{
  background-color: white;

}

.redirectLink:hover{
  background-color: #26a69a;
  cursor:pointer; 
  color: white;
}

</style>
