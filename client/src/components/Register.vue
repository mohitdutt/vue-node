<template>
  <div>
    <h3>Register Page</h3>
    <input type="name" name="name" placeholder="name" v-model="name"><br>
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
      name: '',
      email: '',
      password: ''
    }
  },
  watch: {
    email(value){
    }
  },
  methods: {
     async register(){
      const response = await AuthenticationService.register({
        name: this.name,
        email: this.email,
        password: this.password
      })
      console.log(response)
    }
  },
}
</script>

