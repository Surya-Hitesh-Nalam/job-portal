import mongoose from "mongoose";
import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req,res)=>{
    try {
        const {fullname,email,phonenumber,password,role} = req.body
        if(!fullname || !email || !phonenumber || !password || !role){
            return res.status(400).json({
                message:'something is missing',
                success:false
            })
        }
        const file = req.file
        if (file){
        const fileUri = getDataUri(file)
        const cloudResponce = await cloudinary.uploader.upload(fileUri.content)
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:'user already exist',
                success:false
        })
        }
        const hashedPassword = await bcrypt.hash(password,10)

        await User.create({
            fullname,
            email,
            phonenumber,
            password:hashedPassword,
            role,
            //profile:{
                //profilePhoto:cloudResponce.source_url,
            //}
        })
        return res.status(201).json({
            message:'account created successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password,role} = req.body
        if(!email || !password || !role){
            return res.status(400).json({
                message:'something is missing',
                success:false
            })
        }
        let user = await  User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:'username or password is incorrect',
                success:false
            }) 
        }
        const passwordCheck = await bcrypt.compare(password,user.password)
        if(!passwordCheck){
            return res.status(400).json({
                message:'username or password is incorrect',
                success:false
            })
        }
        if(role!=user.role){
            return res.status(400).json({
                message:'no user exist with  the current role',
                success:false
            })
        }
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}

export  const logout = async(req,res)=>{
    try {
        return res.status(200).cookie('token','',{maxAge:0}).json({
            message:'logged out sucessfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = async(req,res)=>{
    try {
        const {fullname,email,phonenumber,bio,skills} = req.body
        console.log(fullname,email,phonenumber,bio,skills)
        const file = req.file
        const fileUri= getDataUri(file)
        const cloudResponce = await cloudinary.uploader.upload(fileUri.content)

        //code for cloudinery
        let skillsArray
        if(skills){
             skillsArray = skills.split(',')
        }
        const userId=req.id
        let user = await User.findById(userId)

        if(!user){
            res.status(400).json({
                message:'user not found',
                success:false
            })
        }
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phonenumber) user.phonenumber=phonenumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray

        if(cloudResponce){
            user.profile.resume = cloudResponce.secure_url
            user.profile.resumeOrginalName = file.originalname
        }
        console.log(user.profile.resumeOrginalName)
        await user.save();
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:'profile updated successfully',
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}