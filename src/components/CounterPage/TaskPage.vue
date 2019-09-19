<template>
  <div class="meniuElement">     
    <button @click="toggleTasks" class='waves-effect waves-light btn-large'>Choose a task!</button>
    <div id="myTasks" class="meniuElement">
      <ul v-for="(list, index) in tasks" :key="index" class="ulDesign">
        <div class="material-icons deleteIcon" @click="deleteTask(list.id)">delete_forever</div>
        <div class="dropDownItem" @click="chooseTask(list.data.task)">{{list.data.task}} </div> 
      </ul>
      <p v-if="tasks.length < 1">No tasks yet, add a new one to start:</p>
      <div class="meniuElement">
      <button @click="toggleNewTask" class='waves-effect waves-light btn-small'>Add a new task </button>
      </div>
      <form @submit.prevent="addTask" id="newTask">
        <div class="field meniuElement">
          <label for="task">Add a task</label>
          <input type="text" name="task" v-model="newTask">
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      <button class='waves-effect waves-light btn-small'>Add</button>
      </form>
    </div>
    <div class="meniuElement ">Current task: 
      <div class="chip myChip">
        {{this.$store.state.currentTask}}
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'TaskPage', 
  props: ['item'],
  data(){
   return{
    newTask: null, 
    feedback: null,
    tasks: [], 
    }
  }, 

    created() {
//fetch updated data from the firestore
db.collection('tasks').onSnapshot(snapshot => {
  snapshot.forEach(doc=> {
    if(doc.data().to === this.$route.params.email) {
      let task = {}
      task.data =  doc.data()
      task.id = doc.id
      this.tasks.push(task) 
     }
  })
})
  },

  methods: { 
      addTask() { 
        this.tasks = []
        if(this.newTask){
          this.feedback = null
          db.collection('tasks').add({
            to: this.$route.params.email,
            task: this.newTask,
           }).then(() => {
            this.newTask = null
          })
        } 
        else {
          this.feedback = 'You must enter a task to track it'
        }
      }, 

       deleteTask(id) {
        db.collection('tasks').doc(id).delete()
      this.tasks = []
        },
      toggleTasks() {
        var contentId = document.getElementById("myTasks");
        contentId.style.display == "block" ? contentId.style.display = "none" : 
        contentId.style.display = "block"; 
      },

      toggleNewTask() {
        var contentId = document.getElementById("newTask");
        contentId.style.display == "block" ? contentId.style.display = "none" : 
        contentId.style.display = "block"; 
      },

      chooseTask(task) { 
        // Store state in Vuex
        this.$store.commit('SET_TASK', task )
        // In order to re-set the value shown in UI 
        this.toggleTasks()
      }, 

  }, 

}

</script>

<style>
.meniuElement{
  padding-top: 20px;
}

.taskBox{
  padding-top: 10px;
  padding-bottom: 10px;
}

.dropDownItem{
  text-decoration: none; 
  list-style: none; 
  list-style-type: none;
  margin-top: 1px; 
  display: inline-block; 
  padding-bottom: 5px; 
    
}

.dropDownItem:hover{ 
  color:#4db6ac; 
  cursor: pointer;

}

.myChip{
  vertical-align: middle; 
  margin-top: 5px;
}

.deleteIcon {
  display: inline-block; 
  color: grey;
  padding-right: 5px; 
  vertical-align: middle;
}

.deleteIcon:hover{
  color: red; 
  cursor: pointer;
}

#newTask {
  display: none; 
}

#myTasks{ 
 display: none;  
}

.ulDesign { 
  margin-top: 5px;
  margin-bottom: 2px; 
}

</style>


