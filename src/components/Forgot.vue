<template>
    <form @submit.prevent="handleSubmit">
        <h1>Forgot Password</h1>

        <div class="form-group" @submit.prevent="handleSubmit">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required>
        </div>
        <div class="button">
             <button class="btn btn-primary btn-block">Send Reset Link</button>

        </div>
       
    </form>
</template>
<script>
import axios from 'axios'

    export default {
        name: 'Forgot',
        data( ) {
            return {
                email: ''
            }
        },
        methods: {
            async handleSubmit() {
                try{
                const response = await axios.post('http://localhost:3000/forgot', {
                    email: this.email
                });

                console.log(response.data);
                alert('email sent')
                }catch (error) {
                    console.error('Error submitting forgot password request:', error.response.data);
                    alert('error, try again');
                }
                
            }
        }
    }
</script>

<style scoped>
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
    display: flex;
    padding: 20px;
    width: 400px;
    text-align: center;
    margin: auto; 
    margin-top: 50px; 
  }
  label{
    color: black;
  }
.btn{
    display: flex;
    justify-content: center;
}
  h1 {
    color: wheat;
    text-align: center;
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
    display: flex;
    background-color: rgb(208, 84, 105);
    justify-content: center;
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