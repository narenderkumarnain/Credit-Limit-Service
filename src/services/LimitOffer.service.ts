import { BaseService } from "./Base.service";
import { InvalidRequest } from "../commons/Errors";
import { LimitOfferType, OfferStatus } from "../interfaces/ModelEnums";
import LimitOfferRepo from "../repos/LimitOffer.repo";
import AccountRepo from "../repos/Account.repo";
import { CreateLimitOfferRequest, GetActiveLimitOfferRequest, UpdateLimitOfferRequest } from "../interfaces/LimitOffer.dto";

class LimitOfferService extends BaseService {
    async createLimitOffer(params: CreateLimitOfferRequest) {
        const accountDetails = await AccountRepo.getAccount(params.accountId);
        if(!accountDetails) { throw new InvalidRequest("Account Not Found")};

        const accountLimitType = params.limitType;
        const previousLimitValue = accountLimitType === LimitOfferType.ACCOUNT_LIMIT.toString()
                                        ? accountDetails.account_limit : accountDetails.per_transaction_limit;
        if(params.newLimit <= previousLimitValue!) {
            throw new InvalidRequest("New Limit Value must be greater than previous limit value");
        }

        const createOfferResponse = await LimitOfferRepo.createOffer(params);
        return createOfferResponse;
    }

    async getActiveLimitOffers(params: GetActiveLimitOfferRequest) {
        const activeOffers = await LimitOfferRepo.getActiveLimitOffers(params);
        return activeOffers;
    }

    async updateLimitOffer(params: UpdateLimitOfferRequest) {
        const limitOffer = await LimitOfferRepo.getLimitOffer(params.limitOfferId);
        if(!limitOffer) throw new InvalidRequest("Limit Offer with given ID not found");
        // ACTIVE HANDLING 
        if(limitOffer.offerActivationTime > Date.now() && limitOffer.offerExpiryTime < Date.now()) {
            throw new InvalidRequest("Limit Offer is Not Active");
        }

        if(params.status === OfferStatus.REJECTED.toString()) {
            await LimitOfferRepo.updateLimitOfferStatus(params.limitOfferId,  params.status);
            return { message: "Limit Offer rejected"};
        }

        // Accepting the offer
        const accountDetails = await AccountRepo.getAccount(limitOffer.account_id.toString());
        let updateDoc;
        if(limitOffer.limitType ===  LimitOfferType.ACCOUNT_LIMIT.toString()) {
            updateDoc = {
                account_limit: limitOffer.newLimit,
                last_account_limit: accountDetails?.account_limit,
                account_limit_update_time: Date.now()
            };
        } else if(limitOffer.limitType === LimitOfferType.PER_TRANSACTION_LIMIT.toString()) {
            updateDoc = {
                per_transaction_limit: limitOffer.newLimit,
                last_per_transaction_limit: accountDetails?.per_transaction_limit,
                per_transaction_limit_update_time: Date.now()
            };
        }
        if(updateDoc) {
            await AccountRepo.updateAccount(limitOffer.account_id.toString(), updateDoc);
            await LimitOfferRepo.updateLimitOfferStatus(params.limitOfferId, params.status);
        }
        return { message: "Limit Offer Accepted"};
    }
};  

export default new LimitOfferService();