<template>
  <div>
    <h3>Register Page</h3>
    <input type="email" name="email" placeholder="email" v-model="email"><br>
    <input type="password" name="password" placeholder="password" v-model="password"/><br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  watch: {
    email(value){
      // console.log(value)
    }
  },
  methods: {
     async register(){
      // console.log('button is clicked')
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  },
}
</script>

