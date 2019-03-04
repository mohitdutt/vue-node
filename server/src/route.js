const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policy/AuthenticationControllerPolicy')
module.exports = (app)=> {
   app.post('/register', 
   AuthenticationControllerPolicy.register, 
   AuthenticationController.register)

   app.post('/login',
   AuthenticationController.login)

   app.post('/resetPassword',
   AuthenticationController.resetPassword)

   app.post('/setPassword',
   AuthenticationController.setPassword)
}