<template>
 <div>

 </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  export default {
    name: 'emailVerification',
    data() {
      return{

      }
    },
    created(){
      debugger
      this.emailVerification()
    },
    methods: {
     async emailVerification(){
        debugger

        const service = await AuthenticationService.emailVerification({
           id:this.$route.query.id
         })

         console.log(service)
         if(service.status === 200){
           this.$router.push('/login')
         }
      }
    },
  }
</script>

<style scoped>
.el-menu.el-menu--horizontal{
  display: none
}
</style>
