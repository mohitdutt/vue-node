const newUser = require('../../models/user');

module.exports = {
    async register (req, res) {
      try{
        email = req.body.email
        newUser.findOne({email}).then(async (response)=>{
          if(response){
            res.send({
               error: `this email account is already in use..`
            })
          }else{
            const user = await newUser.create(req.body)
            res.send( user.toJSON())
            console.log('user created', user.toJSON())
          }
          
        })
      }catch(err){
        res.status(400).send({
          error: `error in creating user..`
        })
      }
    }
    

    //  register(req, res){
    //       const {name, email ,password } = req.body;
    //       let user = new newUser({
    //           name: name,
    //           email:email,
    //           password:password
    //       })
    //       newUser.findOne({email}).then(response1=> {
    //         if(response1){
    //           res.status(409).json({
    //             msg: "already a user"
    //           })
    //         }else{
    //           user.save().then(response1=>{
    //             res.status(200).json({
    //               msg: "new user created"
    //             })
    //           console.log(response1)
    //           })
    //           .catch(err=>{
    //             res.status(40).json({
    //               msg: "error in creating user",
    //               error: err
    //             })
    //             console.log('error is',err);
    //           })
    //         }
    //       })
    // }
}