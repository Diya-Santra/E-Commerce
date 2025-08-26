import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError"

const isLoggedIn=(req,res,next)=>{
    const accesstoken=req.cookies.accesstoken
    const decoded=jwt.verify(accesstoken,process.env.JWT_SECRET)
    if(!decoded.username){
        throw new ApiError(401,"not valid")
        return
    }
    req.username=decoded
    next()
}

export default isLoggedIn