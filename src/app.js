import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import usersRouter from "./routes/users.routes.js"
import productsRouter from "./routes/products.routes.js"
import reviewsrouter from "./routes/review.routes.js"
import cartRouter from "./routes/cart.routes.js"
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
app.use("/api/v1/product",productsRouter)
app.use("/api/v1/review",reviewsrouter)
app.use("/api/v1/cart",cartRouter)
export default app