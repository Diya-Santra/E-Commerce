import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        required: true
    },
    payment_method: {
        type: String,
        enum: ['credit_card', 'cash', 'paypal', 'bank_transfer'],
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

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

const orders = new mongoose.model("orders", orderSchema)

export default orders