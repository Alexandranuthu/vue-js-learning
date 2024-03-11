<script setup>
import { ref } from "vue";
import axios from 'axios';

const firstname = ref('');
const lastname = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const errors = ref({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: ""
});

const validatefirstname = () => {
  errors.firstname = firstname.value.length >= 5 ? "" : "Firstname must be at least 5 characters.";
};
const validatelastname = () => {
  errors.lastname = lastname.value.length >= 5 ? "" : "Lastname must be at least 5 characters.";
};
const validateusername = () => {
  errors.username = username.value.length >= 5 ? "" : "Username must be at least 5 characters.";
};
const validateemail = () => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  errors.email = regex.test(email.value) ? "" : "Invalid email address.";
};
const validatepassword = () => {
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
    errors.password = "";
  } else {
    errors.password = "Password must meet the following criteria:\n" +
      `- At least ${minLength} characters long\n` +
      `- Contains at least one uppercase letter\n` +
      `- Contains at least one lowercase letter\n` +
      `- Contains at least one number\n` +
      `- Contains at least one special character (!@#$%^&*()_+{}[]:;<>,.?~\\/-)`;
  }
};

const submitForm = () => {
  validatefirstname();
  validatelastname();
  validateusername();
  validateemail();
  validatepassword();

  // Check for any error and return false if there is one
  if (!errors.firstname && !errors.lastname && !errors.username && !errors.email && !errors.password) {
    // Submit the form data to the server
    sendFormData();
  }
};

const sendFormData = () => {
  // Using axios to send the post to the backend
  axios.post('http://localhost:3000/api/signup', {
    firstname: firstname.value,
    lastname: lastname.value,
    username: username.value,
    email: email.value,
    password: password.value
  })
  .then(response => {
    console.log('Form submitted successfully:', response.data);
    alert("Registration Successful!");
    this.$router.push('/login');
  })
  .catch(error => {
    console.error('Error submitting form:', error.response.data);
    alert("An Error Occurred! Please try again later.");
  });
};
</script>

<template>
    <div class="container">
        <form @submit.prevent="submitForm" action="post" method="POST">
            <h1>Register Form</h1>
            <input type="text" id="firstname" placeholder="Firstname" v-model="firstname">
            <p class="errors" v-if="errors.firstname">{{ errors.firstname }}</p>
            <br>
            <input type="text" id="lastname" placeholder="Lastname" v-model="lastname" >
            <p class="errors" v-if="errors.lastname">{{ errors.lastname }}</p>
            <br>
            <input type="text" id="username" placeholder="Username" v-model="username" >
            <p  class="errors" v-if="errors.username">{{ errors.username }}</p>
            <br>
            <input type="text" id="email" placeholder="Email" v-model="email">
            <p  class="errors" v-if="errors.email">{{ errors.email }}</p>
            <br>
            <input type="password" id="password" placeholder="Password" v-model="password" >
<p class="errors" v-if="errors.password">{{ errors.password }}</p>

<input type="password" id="confirmPassword" placeholder="Confirm Password" v-model="confirmPassword" >
<p class="errors" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
            <br>
            <button type="submit" v-if="!errors.firstname && !errors.lastname && !errors.username && !errors.email && !errors.password">Submit</button>

            <br><br>
            <div class="hr">
            <hr>
            <span>Already registered?</span>
            <hr>
        </div>
        <br>
        <button class="login-btn"><a href="login" class="login">Login</a></button>
        </form>
    </div>
</template>







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
  p{
    color: black;
  }
  .login{
        color: rgb(208, 84, 105);
        text-decoration: none;
        font-weight: 700;
    }
    .login-btn{
        background-color: transparent;
        border: 2px solid rgb(208, 84, 105);
    }
    .errors{
      color: red;
    }
</style>
