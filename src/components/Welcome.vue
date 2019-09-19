<template>
  <body >
    
    <div class="welcome">
      <div class="container">
      <h3 >Welcome to Time-Tracker app!</h3>
      <p >Use a timer to track your efficiency.</p>
      <p>Use a 
        <router-link :to="{name: 'Login'}"
         class="redirectLink">
         Login
        </router-link> 
        or 
        <router-link :to="{name: 'SignUp'}"
          class="redirectLink">
          Sign-up
        </router-link> 
          if you are a new user.
      </p>
    </div>
    </div>
  </body>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>

.welcome { 
  width: 100%;
  background-color: rgba(0,0,0,0.6);
  color: #fff;
  padding-top: 1px;
  padding-bottom: 1px; 
}

.redirectLink:hover{
color: white; 
text-decoration: none;
}


</style>



