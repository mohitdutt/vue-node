const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policy/AuthenticationControllerPolicy')
const multer = require('multer');

const fileFilter = (req, file, cb)=>{
   if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
      cb(null, true)
   }else{
      cb(null, false)
   }
}
const storage = multer.diskStorage({
   destination: function(req, file, cb){
      cb(null, './uploads');
   },
   filename: function(req, file, cb){
      cb(null, new Date().toISOString()+ file.originalname);
   }
})
const upload = multer({storage: storage,
   fileFilter: fileFilter
})
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

   app.post('/logout',
   AuthenticationController.logout)

   app.post('/UpdateProfile',
   AuthenticationController.UpdateProfile)

   app.post('/UploadPhoto', upload.single('file'),
   AuthenticationController.UploadPhoto
   )
}