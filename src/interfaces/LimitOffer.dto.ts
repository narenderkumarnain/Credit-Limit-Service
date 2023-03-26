export interface CreateLimitOfferRequest {
    accountId: String,
    limitType: String,
    newLimit: Number,
    offerActivationTime: Number,
    offerExpiryTime: Number
}

export enum OfferStatus {
    PENDING, ACCEPTED, REJECTED
}

export interface GetActiveLimitOfferRequest {
    accountId: String,
    activeDate: Number
};