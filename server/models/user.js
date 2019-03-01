const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let UserSchema = new Schema({
//   email: { type: String, required: true, max: 100 },
//   password: { type: String, required: true }
// },{ collection: 'User', versionKey: false });

let UserSchema1 = new Schema({
    name: {type: String, required:true, max:100},
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true }
});

module.exports = mongoose.model("newUser", UserSchema1,'newuser2');
