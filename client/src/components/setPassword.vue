<template>
  <div class="col-md-4 mt-5" style="margin: 0 auto">
    <el-form :model= "ruleForm" :rules= "rules" :label-position="labelPosition" label-width="100px" ref= "ruleForm">
      <el-form-item label="Password" prop= "password">
        <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Cofirm" prop= "newpassword" class= "label">
        <el-input v-model="ruleForm.newpassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain @click="setnewPassword('ruleForm')">Submit</el-button>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  export default {
    name: 'setPassword',
    data() {
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
      var Validatenewpass = (rule, value, callback) => {debugger
        if (value === '') {
          callback(new Error('Please input the Confirm password'));
        }else if(value != this.$data.ruleForm.password && this.$data.ruleForm.password != ''){
          callback(new Error('Password does not match'));
        }else if(!this.$data.ruleForm.password){
          callback(new Error('Please input the password first'));
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
          password: '',
          newpassword: ''
        },
        rules: {
          password: [
            { validator: Validatepass, trigger: 'blur' }
          ],
          newpassword: [
            { validator: Validatenewpass, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      email(value) {}
    },
    methods: {
      setnewPassword(formName){debugger
        this.$refs[formName].validate(async(valid)=>{
          if(valid){debugger
            console.log('valid')
            const response = await AuthenticationService.setPassword({
              token: this.$route.query.token,
              password: this.ruleForm.password
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

<style scoped>
.label> .el-form-item__label {
  font-size: 11px !important;
}
</style>
