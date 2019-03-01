const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policy/AuthenticationControllerPolicy')
module.exports = function(app) {
    
   return app.post('/register', 
   AuthenticationControllerPolicy.register, 
   AuthenticationController.register)
}