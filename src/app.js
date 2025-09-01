import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import usersRouter from "./routes/users.routes.js"
const app=express()

//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({
    extended:true
}))


//routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",usersRouter)

export default app