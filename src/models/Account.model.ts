import mongoose from "mongoose";
const { Schema } = mongoose;

// Account Schema 
const AccountSchema = new Schema({
    customer_id: {
        type: String,
        require: true
    },
    account_limit: Number,
    per_transaction_limit: Number,
    last_account_limit: Number,
    last_per_transaction_limit: Number,
    account_limit_update_time: Number,
    per_transaction_limit_update_time: Number
});

export default mongoose.model('Account', AccountSchema);