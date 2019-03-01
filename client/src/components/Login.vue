<template>
  <div>
    <h3>Login Page</h3>
    <input type="email" name="email" placeholder="email" v-model="email"><br>
    <input type="password" name="password" placeholder="password" v-model="password"/><br>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  name: 'Login',
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
     async login(){debugger
      // console.log('button is clicked')
      const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      })
      console.log(response)
    }
  },
}
</script>

