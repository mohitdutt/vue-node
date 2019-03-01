const Joi = require('joi');

module.exports = {
    register(req, res, next){
        const UserSchema1 = {
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        const {error} = Joi.validate(req.body, UserSchema1)

        if(error){
            console.log(error.details[0].context)
            switch(error.details[0].context.key){
                case 'name':
                res.status(400).send({
                    error: `you must provide a valid name`
                })
                case 'email':
                res.status(400).send({
                    error: `you must provide a valid email address`
                })
                break;
                case 'password':
                res.status(400).send({
                    error: `you must provide a valid password`
                })
                break;
                default: 
                res.status(400).send({
                    error: `Invalid registeration information`
                })
            }
        }else{
            next()
        }
    }
}