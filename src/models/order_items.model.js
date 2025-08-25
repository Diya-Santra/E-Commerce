import mongoose from "mongoose";

const orderItemSchema=({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'orders',
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantitiy:{
        type:Number,
        required:true,
        min:1
    },
    unit_price:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const orderItems=new mongoose.model("orderItems",orderItemSchema)

export default orderItems