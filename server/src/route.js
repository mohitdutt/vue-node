const AuthenticationController = require('./controllers/AuthenticationController')
module.exports = function(app) {
    
   return app.post('/register', AuthenticationController.register)
}