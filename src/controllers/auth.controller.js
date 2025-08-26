import { asyncHandler } from "../utils/asyncHandler.js";
import { cookie, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/users.model.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



//register controller
export const registerController=asyncHandler(async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError(401,errors.array()[0].msg)
    }
    const{username,email,password}=req.body
    const existingUser=await User.findOne({
        $or : [{username},{email}]
    })
    if(existingUser){
        throw new ApiError(401,"username and email already exists")
    }
    const user=await User.create({
        username,email,password
    })
    return res.json(new ApiRespone(200,user))
})


//login controller
export const loginController=asyncHandler(async(req,res)=>{
    const errors=validationResult(req)
    const{email,password}=req.body;
    const user=await User.findOne({
        email
    })
    if(!user){
        throw new ApiError(400,"user doesn't exist")
    }
    const isPassWordValid=await bcrypt.compare(password,user.password)
    if(!isPassWordValid){
        throw new ApiError(401,"please enter a valid password")
    }
    const token=jwt.sign(
        {username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:'1h'})
        res.cookie("accessToken",token)

        return res.json(new ApiRespone(200,"Logged in successfully"))
})