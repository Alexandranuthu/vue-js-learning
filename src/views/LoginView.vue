<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errors = ref({
  username: "",
  password: ""
});

const router = useRouter();

const validateUsername = () => {
  errors.value.username = username.value.length >= 5 ? "" : "Username must be at least 5 characters.";
};

const validatePassword = () => {
  const minLength = 5;
  const hasUppercase = /[A-Z]/.test(password.value);
  const hasLowercase = /[a-z]/.test(password.value);
  const hasNumber = /\d/.test(password.value);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password.value);

  if (
    password.value.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  ) {
    errors.value.password = "";
  } else {
    errors.value.password = "Password must meet the following criteria:\n" +
      `- At least ${minLength} characters long\n` +
      `- Contains at least one uppercase letter\n` +
      `- Contains at least one lowercase letter\n` +
      `- Contains at least one number\n` +
      `- Contains at least one special character (!@#$%^&*()_+{}[]:;<>,.?~\\/-)`;
  }
};

const submitForm = () => {
  validateUsername();
  validatePassword();

  // Check for any error and return false if there is one
  if (!errors.value.username && !errors.value.password) {
    // Submit the form data to the server
    sendFormData();
  }
};

const sendFormData = () => {
  console.log('Form data before submission:', {
    username: username.value,
    password: password.value
  });

  //using axios to send the post to the backend
  axios.post('http://localhost:3000/api/login', {
    username: username.value,
    password: password.value
  })
  .then(response => {
    console.log('Form submitted successfully:', response.data);
    alert("Login Successful!");
    router.push('dashboard');
  })
  .catch(error => {
    console.error('Error submitting form:', error.response.data);
    alert("An Error Occurred! Please try again later.");
  });
};

</script>



<template>
<div class="container">
    <form @submit.prevent="submitForm">
        <h1>Login</h1>
        <input type="text" v-model="username"  placeholder="Username" @input="validateusername">
        <p class="errors" v-if="errors.username">{{ errors.username }}</p>
        <input type="password" v-model="password" placeholder="Password" @input="validatepassword">
        <p class="errors" v-if="errors.password">{{ errors.password }}</p>
        <p>
            <Router-link to="/forgot">Forgot Password</Router-link>
        </p>
        
        <button type="submit" v-if="!errors.username && !errors.password">Submit</button>
        <br><br>
        <div class="hr">
            <hr>
            <span>Don't have an account yet?</span>
            <hr>
        </div>
        <br>
        <button class="signup-btn"><a href="signup" class="signup">Signup</a></button>
    </form>
</div>
</template>


<script>
import axios from 'axios';
import { useRouter } from 'vue-router';


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
  .errors{
    color: red;
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