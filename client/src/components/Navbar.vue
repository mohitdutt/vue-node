<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
  <!-- <el-submenu index="2">
    <template slot="title">Workspace</template>
    <el-menu-item index="2-1">item one</el-menu-item>
    <el-menu-item index="2-2">item two</el-menu-item>
    <el-menu-item index="2-3">item three</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">item four</template>
      <el-menu-item index="2-4-1">item one</el-menu-item>
      <el-menu-item index="2-4-2">item two</el-menu-item>
      <el-menu-item index="2-4-3">item three</el-menu-item>
    </el-submenu>
  </el-submenu> -->
  <el-menu-item index="3" disabled>Info</el-menu-item>
  <el-menu-item index="4" v-show="login"><router-link to="/register">Sign Up</router-link></el-menu-item>
  <el-menu-item index="5" v-show="login"><router-link to="/login" >Log In</router-link></el-menu-item>
  <el-menu-item index="7" v-show="logOut"><router-link to="/dashboard" >Dashboard</router-link></el-menu-item>
  <el-menu-item index="6" v-show="logOut" @click= "logout"><router-link to="/login" >Log Out</router-link></el-menu-item>
  
</el-menu>
<!-- <div class="line"></div>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">Processing Center</el-menu-item>
  <el-submenu index="2">
    <template slot="title">Workspace</template>
    <el-menu-item index="2-1">item one</el-menu-item>
    <el-menu-item index="2-2">item two</el-menu-item>
    <el-menu-item index="2-3">item three</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">item four</template>
      <el-menu-item index="2-4-1">item one</el-menu-item>
      <el-menu-item index="2-4-2">item two</el-menu-item>
      <el-menu-item index="2-4-3">item three</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>Info</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
</el-menu> -->
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
      if(localStorage.accessToken != ''){
        this.login = false
        this.logOut = true
        this.activeIndex = '7'
      }else{
        this.login = false
        this.logOut = true
      }
    },
    methods: {
      handleSelect(key, keyPath) {debugger
        console.log(key, keyPath);
      },
      async logout(){
        localStorage.accessToken = ''
        this.login = true
        this.logOut = false
        const response = await AuthenticationService.logout({
          accessToken: localStorage.accessToken
        })
         this.$router.push('/') 
      }
    }
  }
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>
