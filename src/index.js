import express from "express";
import dbConnection from "./database/DbConnection.js";
import app from "./app.js";
import dotenv from "dotenv"
import { ApiRespone } from "./utils/ApiResponse.js";

dotenv.config();




const PORT = process.env.PORT


const DB_URL = process.env.Mongo_URL;
dbConnection(DB_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on ${PORT}`);
    })
}).catch((error) => {
    console.error("Mongo is not connected")
})





//listening




