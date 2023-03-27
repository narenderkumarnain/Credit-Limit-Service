export interface CreateLimitOfferRequest {
    accountId: String,
    limitType: String,
    newLimit: Number,
    offerActivationTime: Number,
    offerExpiryTime: Number
}

export enum OfferStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED", REJECTED  = "REJECTED"
}

export interface GetActiveLimitOfferRequest {
    accountId: String,
    activeDate: Number
};

export interface UpdateLimitOfferRequest {
    limitOfferId: String,
    status: String
};