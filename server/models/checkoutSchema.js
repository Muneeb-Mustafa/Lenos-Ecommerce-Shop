import mongoose from "mongoose";
const { Schema } = mongoose;

const checkoutSchema = new Schema({
    cardName: {
        type: String,
        required: true,
        unique: true,
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    expiration:{
        type: String,
        required: true,
    },
    cvv:{
        type: String,
        required: true,
    },    
}, {timestamps: true});

const checkoutModel = mongoose.model("checkout", checkoutSchema);
export default checkoutModel;
