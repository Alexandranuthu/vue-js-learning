<template>
    <form @submit.prevent="handleSubmit">
        <h3>Forgot Password</h3>

        <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" v-model="email">
        </div>

        <button class="btn btn-primary btn-block">Send Reset Link</button>
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
                const response = await axios.post('forgot', {
                    email: this.email
                });

                console.log(response);
            }
        }
    }
</script>