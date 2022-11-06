const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    mailid:{type:String,required:true},
    password:{type:String,required:true},
});

const user = mongoose.model("user",userSchema);

module.exports = user;