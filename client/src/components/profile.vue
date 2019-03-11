<template>
  <div class="col-md-4 mt-5" style="margin: 0 auto">
    <h3>Edit Profile</h3>
    <el-form :model= "ruleForm" :rules= "rules" :label-position="labelPosition" label-width="100px" ref= "ruleForm">

      <el-form-item label="User Name" prop= "name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>

      <el-form-item label="Email" prop= "email">
        <el-input v-model="ruleForm.email" ></el-input>
      </el-form-item>

      <el-form-item label="Phone" prop= "phone">
        <el-input v-model="ruleForm.phone" ></el-input>
      </el-form-item>

      <el-form-item label="Bio" prop= "bio">
        <el-input v-model="ruleForm.bio" ></el-input>
      </el-form-item>

      <el-form-item label="Location" prop= "location">
        <el-input v-model="ruleForm.location" ></el-input>
      </el-form-item>

      <el-form-item label="image upload" prop= "image">
        <!-- <el-upload class="upload-demo" drag action= "http://localhost:3000/UploadPhoto"
            :on-change= "fileupload"  :on-success= "successfileUpload" :on-error= "errorfileUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" v-model="ruleForm.image">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload> -->

        <input type="file" name="file" @change="onFileChanged">
        <button @click="onUpload">Upload!</button>
      </el-form-item>
      <el-button type="primary" plain @click="UpdateProfile('ruleForm')">Update</el-button>
    </el-form>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  import axios from 'axios'
  export default {
    name: 'Profile',
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
      return {
        selectedFile: '',
        file: '',abc: '',
        // fileList: [],
        labelPosition: 'right',
        ruleForm: {
          name: '', email: '', phone: '', image: '', bio: '', location: ''
        },
        rules: {
          // name: [
          //   { validator: Validatename, trigger: 'blur' }
          // ],
           email: [
            { validator: Validateemail, trigger: 'blur' }
          ],
          //  phone: [
          //   { validator: Validatephone, trigger: 'blur' }
          // ],
          //  image: [
          //   { validator: Validateimage, trigger: 'blur' }
          // ],
          //  bio: [
          //   { validator: Validatebio, trigger: 'blur' }
          // ],
          //  location: [
          //   { validator: Validatelocation, trigger: 'blur' }
          // ],
        },
      }
    },
    created() {debugger
      var userInfo = JSON.parse(localStorage.userDetails)
      console.log(userInfo)

      this.ruleForm.name = userInfo.name
      this.ruleForm.email = userInfo.email
      this.ruleForm.phone = userInfo.phone
      this.ruleForm.bio = userInfo.bio
      this.ruleForm.location = userInfo.location
    },
    methods: {
      // errorfileUpload(err, file, fileList){debugger},
      // successfileUpload(response, file, fileList){
      //   console.log(file)
      // },
      // fileupload(file, fileList){debugger
      //   this.fileList.push({name: file.name})
      // },
      //  handleRemove(file, fileList) {debugger
      //   console.log(file, fileList);
      // },
      // handlePreview(file) {debugger
      //   console.log(file);
      // },
      // handleExceed(files, fileList) {debugger
      //   this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      // },
      // beforeRemove(file, fileList) {debugger
      //   return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      // },
      handleFileUpload(){debugger
          this.file = this.$refs.file.files[0];
        },
      onFileChanged (event) {
        this.selectedFile = event.target.files[0]
      },
      async onUpload() {debugger
      const configheader = { headers: { 'Content-Type': 'multipart/form-data' } };
        let formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('accessToken', localStorage.accessToken)
        //  Api().post('UploadPhoto', formData, {
        //    headers: {'Content-Type': 'multipart/form-data'}
        //  }).then(response=>{
        //    console.log(response)
        //  }).catch(error=>{
        //    console.log(error)
        //  })
      // const response =  await AuthenticationService.UploadPhoto({
      //     formData
      //   })
      return axios.post("http://localhost:3000/UploadPhoto",
       formData,
       configheader)
        console.log(response)
      },
      UpdateProfile(formName){debugger
        this.$refs[formName].validate(async(valid)=>{
          if(valid){
             let formData = new FormData();
            formData.append('file', this.file);
            // const resposnephoto = await AuthenticationService.UploadPhoto({
            //   formData
            // }).then(()=>{
            //   console.log('success!!')
            // }).catch(()=>{
            //   console.log('failure!!')
            // })
            this.abc = formData;
            console.log(formData)
            const response = await  AuthenticationService.UpdateProfile({
              formData,
              name: this.ruleForm.name,
              email: this.ruleForm.email,
              phone: this.ruleForm.phone,
              bio: this.ruleForm.bio,
              location: this.ruleForm.location,
              accessToken: localStorage.accessToken
            })
            console.log(response)
            localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails))
            return false;
          }else{
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
  }
</script>
