const newUser = require('../../models/user');
const jwt = require('jsonwebtoken')
const conf = require('../../conf')
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  auth: {
         user: 'mohitduttqexon@gmail.com',
         pass: 'mohitdutt11111.',

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
              let jwToken = jwt.sign({ email }, conf.db.jwtSalt);
              response.accessToken = jwToken;
              response.save().then(resp=>{
              })
              // newUser.update({email},
              //   { $set:
              //       {
              //         accessToken: jwToken
              //       }
              //   }
              // )
              res.status(200).send({
                msg: `logged in successfully`,
                accessToken: jwToken,
                name: response.name,
                email: response.email
              })
            }else if(response.password !== password){
              res.status(400).send({
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
              done(err, user);
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
            if(err)
              console.log('err')
            else
              console.log('info',data.html);
              res.status(200).send({
                data: data.html
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
            resposne.password = password
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
    }
}