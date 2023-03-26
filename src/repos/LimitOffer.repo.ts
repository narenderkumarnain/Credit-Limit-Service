import { CreateLimitOfferRequest, GetActiveLimitOfferRequest, OfferStatus } from '../interfaces/LimitOffer.dto';
import LimitOffersModel from '../models/LimitOffers.model';

class LimitOfferRepo {
    async createOffer(params: CreateLimitOfferRequest) {
        const newLimitOffer = await LimitOffersModel.create({
            account_id: params.accountId,
            limitType: params.limitType,
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
};

export default new LimitOfferRepo();