import { asyncHandler } from "../utils/asyncHandler.js";
import {  validationResult } from "express-validator";

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
        username,
        email,
        password,
        role:"customer"
    })

    const accessToken=await user.generateAccessToken();
    const refreshToken=await user.generateRefreshToken();

    res.cookie("accessToken",accessToken);
    res.cookie("refreshToken",refreshToken);

    
    return res.json(new ApiRespone(200,user))
})


//login controller
export const loginController=asyncHandler(async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError(401,errors.array()[0].msg)
    }
    const{email,password}=req.body;
    const user=await User.findOne({
        email
    })
    if(!user){
        throw new ApiError(400,"user doesn't exist")
    }
    const isPassWordValid=user.validatePassword(password)
    if(!isPassWordValid){                                                               
        throw new ApiError(401,"please enter a valid password")
    }
    const accessToken=await user.generateAccessToken();
    const refreshToken=await user.generateRefreshToken();
     res.cookie("accessToken",accessToken)
     res.cookie("refreshToken",refreshToken)

    return res.json(new ApiRespone(200,"Logged in successfully"))
})

//refresh token
export const refreshTokenController=asyncHandler(async(req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        throw new ApiError(401,"refresh toke not found");
    }
    const decoded=jwt.verify(refreshToken,process.env.REFRESH_SECRET)
    if(!decoded){
        throw new ApiError(403,"Invalid refresh token")
    }
    const user=await User.findOne({username:decoded.username})
    if(!user){
        throw new ApiError(403,"Unauthorized")
    }
    if(user.refreshToken!=refreshToken){
        throw new ApiError(403,"Unauthorized")
    }                                                                                   
    const token=await user.generateAccessToken()
    const newRefreshToken=await user.generateRefreshToken()

    res.cookie("accessToken",token)
    res.cookie("refreshToken",newRefreshToken)

    res.json(new ApiRespone(200,"New token generated"))
})