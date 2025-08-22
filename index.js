import express from "express";
import dbConnection from "./database/DbConnection.js";
import dotenv from "dotenv"

dotenv.config();


//app initialization
const app=express()


const DB_URL = process.env.Mongo_URL;
dbConnection(DB_URL);




//listening
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
