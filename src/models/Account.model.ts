import mongoose from "mongoose";
const { Schema } = mongoose;

// Account Schema 
const AccountSchema = new Schema({
    customer_id: {
        type: String,
        require: true
    },
    account_limit: {
        type: Number,
        default: 0
    },
    per_transaction_limit: {
        type: Number,
        default: 0
    },
    last_account_limit: {
        type: Number,
        default: 0
    },
    last_per_transaction_limit: {
        type: Number,
        default: 0
    },
    account_limit_update_time: {
        type: Number,
        default: Date.now()
    },
    per_transaction_limit_update_time: {
        type: Number,
        default: Date.now()
    }
});

export default mongoose.model('Account', AccountSchema);