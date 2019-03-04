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
  }
}
