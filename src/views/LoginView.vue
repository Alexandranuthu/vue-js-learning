<script setup>
import { ref } from "vue";

const username = ref('');
const password = ref('');

const login = async () => {
    console.log(`${username.value} ${password.value}`);
}
</script>
<template>
<div class="container">
    <form @submit.prevent="login">
        <h1>Login</h1>
        <input type="text" v-model="username"  placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
        <p>
            <Router-link to="/forgot">Forgot Password</Router-link>
        </p>
        
        <button type="submit">Submit</button>
        <br><br>
        <div class="hr">
            <hr>
            <span>Dont' have an account yet?</span>
            <hr>
        </div>
        <br>
        <button class="signup-btn"><a href="signup" class="signup">Signup</a></button>
    </form>
</div>
</template>

<script>
export default{
    name: 'LoginView',
}

</script>

<style scoped>
.hr {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .hr hr {
    flex-grow: 1;
    border: none;
    height: 1px;
    background-color: #ccc;
    margin: 0 10px; 
  }

  .hr span {
    color: #555; 
  }
body {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

  }
  p{
    color: black;
    float: right;
  }

  .container {
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    text-align: center;
    margin: auto; 
    margin-top: 50px; 
  }
  label{
    color: black;
  }

  h1 {
    color: #333;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 8px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    background-color: rgb(208, 84, 105);
    width: 350px;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
  }
    .signup{
        color: rgb(208, 84, 105);
        text-decoration: none;
        font-weight: 700;
    }
    .signup-btn{
        background-color: transparent;
        border: 2px solid rgb(208, 84, 105);
    }

  
</style>