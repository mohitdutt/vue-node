<template>
  <div class="col-md-4 mt-5" style="margin: 0 auto">
    <h3 v-show="forgotpwd">Enter Your Email</h3>
    <el-form :model= "ruleForm" :rules= "rules" :label-position="labelPosition" label-width="100px" ref= "ruleForm">
      <el-form-item label="Email" prop= "email">
        <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop= "password" v-show="forgotpwdflip">
        <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain @click="login('ruleForm')" v-show="forgotpwdflip">Login</el-button>
    <el-button type="info" plain @click="forotPassword" v-show="forgotpwdflip">Forgot Password</el-button>
    <el-button type="primary" plain @click="forgotPasswordSubmit('ruleForm')" v-show="forgotpwd">Submit</el-button>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  export default {
    name: 'Login',
    data() {
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
          email: '',
          password: ''
        },
        rules: {
          email: [
            { validator: Validateemail, trigger: 'blur' }
          ],
          password: [
            { validator: Validatepass, trigger: 'blur' }
          ]
        },
        forgotpwd: false, forgotpwdflip:true
      }
    },
    watch: {
      // email(value) {}
    },
    methods: {
       login(formName) {debugger
        this.$refs[formName].validate(async(valid)=>{
          if(valid){
            const response = await  AuthenticationService.login({
              email: this.ruleForm.email,
              password: this.ruleForm.password
            })
            console.log(response)
            return false;
          }else{
            console.log('error submit!!');
            return false;
          }
        })
      },
      forotPassword(){debugger
        this.forgotpwd = !this.forgotpwd;
        this.forgotpwdflip = !this.forgotpwdflip
        this.rules.password.pop()
      },
      forgotPasswordSubmit(formName){
        this.$refs[formName].validate(async (valid)=>{
          if(valid){debugger
            const response = await AuthenticationService.resetPassword({
              email: this.ruleForm.email
            })
             console.log(response)
            return false;
          }else{
            console.log('not valid')
            return false;
          }
        })
      }
    },
  }
</script>

