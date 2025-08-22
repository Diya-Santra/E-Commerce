import mongoose from "mongoose";

const paymentSchemea = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    payement_method: {
        type: String,
        enum: ['credit_card', 'cash', 'paypal', 'bank_transfer'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
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

const payemnt = new mongoose.model("payment", paymentSchemea);

export default payemnt