<template>
  <div>
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions" 
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
    components:{
    GChart
    },
    name: 'Charts', 
    props: ['week'],

    data() {
return{ 
  chartData: [
        ['Tasks', 'hours']
      ],
    chartData2: [
    ], 
    chartOptions: {
      chart: {
        title: 'Time Usage',
        },
      tooltip: {
        text: 'percentage',
        ignoreBounds: false,
      }, 
      chartArea: {
        left: 5,
       
      }, 
      legend: {
        alignment: 'start',
        position:'left'
      }
      ,
         forceIFrame: true, 
          is3D: true,
          pieStartAngle: 100, 

    }
      }

  }, 

  created() {
    this.formatData()
    this.addArray()

  },

   methods: {

    formatData() { 
      this.week.forEach((task) => {
      var temp =[]
      temp.push(task.task)
      temp.push(task.totalTime /1000 / 60 )
      this.chartData2.push(temp)
      })

    },

    addArray() {
      var result = this.chartData.concat(this.chartData2)
      this.chartData = result
    }

  }

}
</script>


<style>

  svg > g > g.google-visualization-tooltip { pointer-events: none }



</style>

