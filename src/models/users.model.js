import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['customer','admin','seller']
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save',async function save(next) {
    if(!this.isModified('passowrd'))return next()
    try{
        this.password=await bcrypt.hash(this.password,10)
        return next()}
        catch(err){
            return next(err)
        }
})

userSchema.methods.validatePassword=async function validatePassword(passowrd) {
    return bcrypt.compare(passowrd,this.passowrd)
}



const User=new mongoose.model("User",userSchema)

export default User