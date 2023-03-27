import { CreateLimitOfferRequest, GetActiveLimitOfferRequest, OfferStatus } from '../interfaces/LimitOffer.dto';
import LimitOffersModel from '../models/LimitOffers.model';

class LimitOfferRepo {
    async createOffer(params: CreateLimitOfferRequest) {
        const newLimitOffer = await LimitOffersModel.create({
            account_id: params.accountId,
            limitType: params.limitType,
            status: OfferStatus.PENDING.toString(),
            newLimit: params.newLimit,
            offerActivationTime: params.offerActivationTime,
            offerExpiryTime: params.offerExpiryTime
        });
        return newLimitOffer;
    }

    async getActiveLimitOffers(params: GetActiveLimitOfferRequest) {
        const activeOffers = await LimitOffersModel.find({
            status: OfferStatus.PENDING.toString(),
            offerActivationTime: { $lt: params.activeDate },
            offerExpiryTime: { $gt: params.activeDate } 
        }).exec();
        return activeOffers;
    }

    async getLimitOffer(limitOfferId: String) {
        const limitOffer = await LimitOffersModel.findById(limitOfferId);
        return limitOffer;
    }

    async updateLimitOfferStatus(limitOfferId: String, status: String) {
        await LimitOffersModel.findByIdAndUpdate(limitOfferId, { status: status } );
    }
};

export default new LimitOfferRepo();