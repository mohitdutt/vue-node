<template>
  <div class="col-md-4 mt-5" style="margin: 0 auto">
    <el-form :model= "ruleForm" :rules= "rules" :label-position="labelPosition" label-width="100px" ref= "ruleForm">
      <el-form-item label="Name" prop= "name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop= "email">
        <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop= "password">
        <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain @click="register('ruleForm')">Register</el-button>
     <router-link to= "/login"><el-button type="success" plain class= "login">Login</el-button></router-link>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  export default {
    name: 'Register',
    data() {
       var Validatename = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the name'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var Validateemail = (rule, value, callback) => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === '') {
          callback(new Error('Please input the email'));
        }else if(!re.test(value) && value != ''){
          callback(new Error('Invalid email address'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var Validatepass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        labelPosition: 'right',
        ruleForm: {
          name: '',
          email: '',
          password: ''
        },
        rules: {
          name: [
            { validator: Validatename, trigger: 'blur' }
          ],
          email: [
            { validator: Validateemail, trigger: 'blur' }
          ],
          password: [
            { validator: Validatepass, trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      email(value) {}
    },
    methods: {
       register(formName) {
        this.$refs[formName].validate(async(valid)=>{
          if(valid){debugger
            const response = await  AuthenticationService.register({
              name: this.ruleForm.name,
              email: this.ruleForm.email,
              password: this.ruleForm.password
            })
            console.log(response)
          }else{
            console.log('error submit!!');
            return false;
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
