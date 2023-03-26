import mongoose from "mongoose";
const { Schema } = mongoose;
import { LimitOfferType, OfferStatus } from "../interfaces/ModelEnums";

const LimitOfferSchema = new Schema({
    account_id: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    limitType: {
        type: String,
        enum: LimitOfferType,
        required: true
    },
    status: {
        type: String,
        enum: OfferStatus,
        required: true
    },
    newLimit: {
        type: Number,
        required: true
    },
    offerActivationTime: {
        type: Number,
        required: true
    },
    offerExpiryTime: {
        type: Number,
        required: true
    }
});

export default mongoose.model('LimitOffer', LimitOfferSchema);