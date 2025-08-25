import mongoose from "mongoose";

const dbConnection=async (DB_URL)=>{
    await mongoose.connect(DB_URL)
    .then(()=>{
        console.log("Mongodb is connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default dbConnection