const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let UserSchema = new Schema({
//   email: { type: String, required: true, max: 100 },
//   password: { type: String, required: true }
// },{ collection: 'User', versionKey: false });

let UserSchema1 = new Schema({
    name: {type: String, required:true, max:100},
    email: { type: String, required: true, max: 100 },
    phone: {type: Number},
    bio: {type: String, max: 1000},
    location: {type: String, max: 1000},
    image: {type: String},
    password: { type: String, required: true },
    // accessToken: {type: String, default: null},
    reset_password_token: {type: String, default: null},
    user_Activation: {type: Number, default: 0},
    is_Admin: {type: String, default:0}
});

module.exports = mongoose.model("newUser", UserSchema1,'newuser2');
