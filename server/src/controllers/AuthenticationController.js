const newUser = require('../../models/user');
const jwt = require('jsonwebtoken')
const conf = require('../../conf')
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const encrypt= require('../middleware/enc-dcr') 
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  auth: {
         user: 'mohitduttqexon@gmail.com',
         pass: 'mohitduttibm5.'

     }
 });
  
module.exports = {
    async register (req, res) {
      try{
        const { email } = req.body;
        newUser.findOne({email}).then(async (response)=>{
          if(response){
            res.send({
               error: `this email account is already in use..`
            })
          }else{
            const user = await newUser.create(req.body)
            res.send( user.toJSON())

            const yeah = await newUser.findOne({email: req.body.email}).then(async (response)=>{
              let arr = await encrypt.encrypt(req.body.email);
              console.log('arr',arr)

              if(response){
                var data = {
                  to: response.email,
                  from: `mohitduttqexon@gmail.com`,
                  subject: 'Email verification message!!',
                  html: `<div>`+`hello please click on given link ${'http://localhost:8080/emailVerification?id='}`+response._id+`</div>`
                };

                transporter.sendMail(data, function (err, info) {
                  console.log(data)
                  if(err)
                    console.log('error in sending email')
                  else
                    console.log('info',data.html);
                    res.send({
                      error: 'error in nsending email'
                    })
               });
              }else{
                console.log('user not found')
                res.send({
                  error: 'user not found'
                })
              }
            })
            
          }
        })
      }catch(err){
        res.status(400).send({
          error: `error in creating user..`
        })
      }
    },
    
     login (req, res){
      try{
        const { email ,password } = req.body;
        newUser.findOne({email}).then( response=>{
          if(response){
            if(response.password === password){
              if(response.user_Activation === 1){
                let jwToken = jwt.sign({ email }, 'secretKey' );
                // response.accessToken = jwToken;
                response.save().then(resp=>{
                })
                res.status(200).send({
                  msg: `logged in successfully`,
                  userData: {
                    name: response.name, email: response.email, user_Activation: response.user_Activation
                  },
                  accessToken: jwToken
                })
              }else{
                res.send({
                  msg: 'user is temporarly deactivated!'
                })
              }
            }else if(response.password !== password){
              res.status(401).send({
                msg: `password does not match`
              })
            }
          }else{
            res.status(400).json({
              msg: "No user found in this email",
            }) 
          }
         
        })
      }catch(err){
        res.status(400).send({
          error: `error in login..`
        })
      }
    },

    resetPassword(req, res){
      async.waterfall([
        function(done) {
          newUser.findOne({
            email: req.body.email
          }).exec(function(err, user) {
            if (user) {
              if(user.user_Activation === 1){
                done(err, user);
              }else{
                console.log('user is not activated yet')
              }
            } else {
              done('newUser not found.');
            }
          });
        },
        function(user, done) {
          // create the random token
          crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString('hex');
            done(err, user, token);
          });
        },
        function(user, token, done) {
          newUser.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
            done(err, token, new_user);
          });
        },
        function(token, user, done) {
          var data = {
            to: user.email,
            from: `mohitduttqexon@gmail.com`,
            subject: 'Password help has arrived!',
            html: `<div>`+`hello data ${'http://localhost:8080/setPassword?token='}`+token+`</div>`
          };
    
          transporter.sendMail(data, function (err, info) {
            console.log(data)
            if(err)
              console.log('error')
            else
              console.log('info',data.html);
              res.status(200).send({
                message: `email sent successfully`
              })

         });
        }
      ],
       function(err) {
        return res.status(422).json({ message: err });
      });
    },

      setPassword(req, res){
      try{
        const { token, password } = req.body;
        newUser.findOne({reset_password_token:token}).then( response=>{
          if(response){
            response.reset_password_token = '',
            response.password = password
            response.save().then(resp=>{
              console.log('resp', resp)
            })
            res.status(200).send({
                msg: `password set successfully!`
              }) 
          }

        });
      }catch(err){

      }
    },

    logout(req, res){
      try{
        const { accessToken } = req.body;
        newUser.findOne({accessToken}).then (response=>{
          if(response){
            response.accessToken = null
            response.save().then(resp=>{
              console.log('resp', resp)
            })
            res.status(200).send({
              msg: `logout`
            })
          }
        })
      }catch(err){

      }
    },

    UpdateProfile(req, res){
      try{  
        const {name, email, phone, bio, location, image, accessToken} = req.body
        console.log(req)
        newUser.findOne({accessToken}).then (response=> {
          if(response){ 
            response.name = name, response.email = email, response.phone = phone,
            response.bio = bio, response.location = location, response.image = image

            response.save().then(resp=>{
              // console.log('resp', resp)
            })
            res.status(200).send({
              msg: `update profile successfully`,
              userDetails: response
            })

          }
        })
      }catch(err){

      }
    },
    
    UploadPhoto(req, res, next){
      try{
        console.log(req.file)
        const { accessToken } = req.body;
        newUser.findOne({accessToken}).then(response=>{
          if(response){
            
            response.image = req.file.filename
            response.save().then(resp=>{
            })
            res.status(200).send({
              msg: `update profile successfully`,
              userDetails: response
            })
          }
        })
      }catch(err){
        console.log('error')
      }
    },

    emailVerification(req, res, next){
      newUser.find({_id: req.body.id}).then(response=>{
        if(response.length){
          if(response[0].user_Activation === 0){
            response[0].user_Activation = 1;
            response[0].save()
            res.status(200).send({
              msg: `user activated successfully!!`,
              email: response[0].email
            })
          }else{
            console.log('user is already activated')
          }
          
        }else{
          console.log('error')
        }
      })
    }
}