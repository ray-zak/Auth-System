import mongoose from "mongoose";

const User_Schema = new mongoose.Schema({
    Username: {type: String , required:true, unique: true},
    Password: {type: String , required:true},
    Email: {type: String}

},{timestamps:true})

export default mongoose.model("Users" , User_Schema);

