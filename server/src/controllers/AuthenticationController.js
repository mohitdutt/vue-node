const newUser = require('../../models/user');

module.exports = {
    // async register (req, res) {
    //     // console.log(res)
    //     console.log(req.body)
    //   if(res){
    //     const usUserer = await User.create(req.body)
    //     constmodels userJson = user.toJSON()
    //     res.smodelsend({
    //       usemodelsr: userJson,
    //       token: jwtSignUser(userJson)
    //     })
    //   } else {
    //     res.status(400).send({
    //       error: 'ThUser1is email account is already in use.'
    //     })
    //   }
    // }
    

     register(req, res){
          const {name, email ,password } = req.body;
          let user = new newUser({
              name: name,
              email:email,
              password:password
          })
          newUser.findOne({email}).then(response1=> {
            if(response1){
              res.status(409).json({
                msg: "already a user"
              })
            }else{
              user.save().then(response1=>{
                res.status(200).json({
                  msg: "new user created"
                })
              console.log(response1)
              })
              .catch(err=>{
                res.status(400).json({
                  msg: "error in creating user",
                  error: err
                })
                console.log('error is',err);
              })
            }
          })
    }
}