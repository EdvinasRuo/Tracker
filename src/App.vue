<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>


<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components : {
    Navbar
  }
}
</script>


<style >

body {
  font-family: 'Raleway', sans-serif;
  background-image: url('./assets/time.jpg'); 
  background-position: center center;
	background-repeat:  no-repeat;
	background-attachment: fixed;
	background-size:  cover;
  margin: 0;
  padding: 0;
  height:auto; 
}


</style>


