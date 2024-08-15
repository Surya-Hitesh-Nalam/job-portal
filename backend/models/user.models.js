import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter']
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOrginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId , ref:'Company'},
        profilePhoto:{
            type:String,
            default:''
        }
    }
},{timestamps:true})
const User=mongoose.model('User',userSchema)

export default User
