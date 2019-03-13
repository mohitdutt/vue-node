<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4" v-show="login"><router-link to="/register">Sign Up</router-link></el-menu-item>
    <el-menu-item index="5" v-show="login"><router-link to="/login" >Log In</router-link></el-menu-item>
    <el-menu-item index="7" v-show="logOut"><router-link to="/dashboard" >Dashboard</router-link></el-menu-item>
    <el-menu-item index="6" v-show="logOut" @click= "logout"><router-link to="/login" >Log Out</router-link></el-menu-item>
</el-menu>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
  export default {
    name: 'navbar',
    data() {
      return {
        activeIndex: '1',
        login: true,
        logOut: false,
      };
    },
    created() {
      debugger
      if(localStorage.accessToken){
        this.login = false
        this.logOut = true
        this.activeIndex = '7'
      }else{
        this.login = true
        this.logOut = false
      }
    },
    methods: {
      handleSelect(key, keyPath) {debugger
        console.log(key, keyPath);
      },
       logout(){
         this.login = true
        this.logOut = false
        this.activeIndex = '5'
        localStorage.removeItem('accessToken')
         this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>
