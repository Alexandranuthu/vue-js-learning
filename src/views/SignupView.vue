// it has to have three parts
<script setup>
import { ref } from "vue";


const firstname = ref('');
const lastname = ref('');
const username = ref('');
const password = ref('');

const signup = async () => {
    console.log(`${firstname.value} ${lastname.value} ${username.value} ${password.value}`);
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="signup">
            <h1>Register Form</h1>
            <input type="text" id="firstname" placeholder="Firstname" v-model="firstname" @input="validatefirstname">
            <p class="errors" v-if="errors.firstname">{{ errors.firstname }}</p>
            <br>
            <input type="text" id="lastname" placeholder="Lastname" v-model="lastname" @input="validatelastname">
            <p class="errors" v-if="errors.lastname">{{ errors.lastname }}</p>
            <br>
            <input type="text" id="username" placeholder="Username" v-model="username" @input="validateusername">
            <p  class="errors" v-if="errors.username">{{ errors.username }}</p>
            <br>
            <input type="password" id="password" placeholder="Password" v-model="password" @input="validatepassword">
            <p class="errors" v-if="errors.password">{{ errors.password }}</p>
            <br>
            <button type="submit">Submit</button>
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
export default{
    name: 'SignupView',
    data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
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
    validatePassword() {
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
      this.validatepassword();
      
      // Check for any error and return false if there is one
      if ( !this.errors.firstname && !this.errors.lastname && !this.errors.username && !this.errors.password) {
        // Submit the form data to the server
        console.log("Form submitted:", { firstname: this.firstname, lastname: this.lastname, username: this.username, password: this.password });
      }
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
