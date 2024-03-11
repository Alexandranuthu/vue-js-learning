// it has to have three parts
<script setup>
import { ref } from "vue";

// Variables to store user input data
const firstname = ref('');
const lastname = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
// Function to handle user signup process
const signup = async () => {
  // Log user input data for debugging or future reference
    console.log(`${firstname.value} ${lastname.value} ${username.value} ${email.value} ${password.value}`);
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="submitForm" action="post" method="POST">
            <h1>Register Form</h1>
            <input type="text" id="firstname" placeholder="Firstname" v-model="firstname"  @input="validatefirstname; errors.firstname = ''">
            <p class="errors" v-if="errors.firstname">{{ errors.firstname }}</p>
            <br>
            <input type="text" id="lastname" placeholder="Lastname" v-model="lastname" @input="validatelastname; errors.lastname = ''">
            <p class="errors" v-if="errors.lastname">{{ errors.lastname }}</p>
            <br>
            <input type="text" id="username" placeholder="Username" v-model="username" @input="validateusername; errors.username = ''">
            <p  class="errors" v-if="errors.username">{{ errors.username }}</p>
            <br>
            <input type="text" id="email" placeholder="Email" v-model="email" @input="validateemail; errors.email = ''">
            <p  class="errors" v-if="errors.email">{{ errors.email }}</p>
            <br>
            <input type="password" id="password" placeholder="Password" v-model="password" @input="validatepassword; errors.password = ''">
            <p class="errors" v-if="errors.password">{{ errors.password }}</p>
            <br>
            <button type="submit" @click="sendFormData" v-if="!errors.firstname && !errors.lastname && !errors.username && !errors.email && !errors.password">Submit</button>

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



<script>
import axios from 'axios';

export default{
    name: 'SignupView',
    data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      errors: {
        firstname:"",
        lastname:"",
        username: "",
        password:""
      }
    };
  },
  methods: {
    validatefirstname() {
      this.errors.firstname = this.firstname.length >= 5 ? "" : "Firstname must be at least 5 characters.";
    },
    validatelastname() {
      this.errors.lastname = this.lastname.length >= 5 ? "" : "Lastname must be at least 5 characters.";
    },
    validateusername() {
      this.errors.username = this.username.length >= 5 ? "" : "Username must be at least 5 characters.";
    },
    validateemail() {
      const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      this.errors.email = regex.test(this.email) ? "" : "Invalid email address.";
    },
    validatepassword() {
  const minLength = 5;
  const hasUppercase = /[A-Z]/.test(this.password);
  const hasLowercase = /[a-z]/.test(this.password);
  const hasNumber = /\d/.test(this.password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.password);

  if (
    this.password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  ) {
    this.errors.password = "";
  } else {
    this.errors.password = "Password must meet the following criteria:\n" +
      `- At least ${minLength} characters long\n` +
      `- Contains at least one uppercase letter\n` +
      `- Contains at least one lowercase letter\n` +
      `- Contains at least one number\n` +
      `- Contains at least one special character (!@#$%^&*()_+{}[]:;<>,.?~\\/-)`;
  }
},


    submitForm() {
      this.validatefirstname();
      this.validatelastname();
      this.validateusername();
      this.validateemail();
      this.validatepassword();
      
      // Check for any error and return false if there is one
      if ( !this.errors.firstname && !this.errors.lastname && !this.errors.username && !this.errors.email && !this.errors.password) {
        // Submit the form data to the server
        this.sendFormData();
      }
    },
    sendFormData() {

      console.log('Form data before submission:', {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value
  });
      //using axios to send the post to the backend
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
    }
  }
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
