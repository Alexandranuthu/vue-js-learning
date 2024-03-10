<script setup>
//declaring a reactive state
import { ref } from "vue";

const count = ref(0)

//count is an object, for you to access it you have to put .value
function increment(){
  count.value++

  console.log(count);
}

function decrement() {
  count.value--

  console.log(count);
}

</script>

<template>
<div class="nav">
  <Router-link  style="text-decoration:none" class="nav-item" to="/">HOME</Router-link>
  <Router-link style="text-decoration:none" class="nav-item" to="/about">ABOUT</Router-link>
  <Router-link style="text-decoration:none" class="nav-item" to="">CONTACT</Router-link>
  <div class="authentication">
    <Router-link style="text-decoration:none" class="nav-item" to="/login"><button>LOGIN</button></Router-link>
    <Router-link style="text-decoration:none" class="nav-item" to="/signup"><button>SIGNUP</button></Router-link>
  </div>
  
</div>
<router-view> </router-view>

<!-- <SignupView/> -->

<div class="container">
    <h1>Counter App</h1>
    <!-- Listening to events -->
    <!-- inline event handlers -->
  <button @click="increment">Increment</button>
  <button v-on:click="decrement">decrement</button>
  <p>{{count}}</p>
</div>

</template>

// <script>
// import SignupView from "./views/SignupView.vue";
// export default{
//   components:{
//     SignupView
//   }
// }
// </script>

<style scoped>
body{
  display: flex;
}
.nav{
  display: flex;
  flex-direction: row;
  height: 40px;
  text-align: center;
  justify-content: space-around;
}
.nav-item{
  color: white;
  font-weight: 700;
  text-align: center;
}
.nav-item:hover{
  color: red;
}
.authentication{
  display: flex;
  gap: 15px;
  
}
.authentication button{
  width: 150px;
  height: 40px;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  border: none;
  border-radius: 3px;
}
</style>
