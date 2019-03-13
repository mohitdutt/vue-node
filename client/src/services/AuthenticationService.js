import Api from '@/services/Api'

export default {
 postData(page, data){debugger

    return Api().post(page, data)
  },

  emailVerification(credentials){debugger
    return Api().post('emailVerification', credentials)
  },

  posts(credentials){debugger
    return Api().post('posts', credentials,
    {
      headers: {
        authorization:'Token '+localStorage.accessToken
      }
    }
  )},
  // register(credentials){
  //   return Api().post('register', credentials)
  // },
  // login(credentials){
  //   return Api().post('login', credentials)
  // },
  // resetPassword(credentials){
  //   return Api().post('resetPassword', credentials)
  // },
  // setPassword(credentials){
  //   return Api().post('setPassword', credentials)
  // },
  logout(credentials){
    return Api().post('logout', credentials)
  },
  UpdateProfile(credentials){
    return Api().post('UpdateProfile', credentials)
  },
  UploadPhoto(credentials){debugger
    return Api().post('UploadPhoto', credentials,
    {
      headers: {'Content-Type': 'multipart/form-data'}
    })
  }
}
