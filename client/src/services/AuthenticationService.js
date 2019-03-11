import Api from '@/services/Api'

export default {
  register(credentials){
    return Api().post('register', credentials)
  },
  login(credentials){
    return Api().post('login', credentials)
  },
  resetPassword(credentials){
    return Api().post('resetPassword', credentials)
  },
  setPassword(credentials){
    return Api().post('setPassword', credentials)
  },
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
