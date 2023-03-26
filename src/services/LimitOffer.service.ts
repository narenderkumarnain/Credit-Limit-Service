import { BaseService } from "./Base.service";
import { InvalidRequest } from "../commons/Errors";
import { LimitOfferType } from "../interfaces/ModelEnums";
import LimitOfferRepo from "../repos/LimitOffer.repo";
import AccountRepo from "../repos/Account.repo";
import { CreateLimitOfferRequest, GetActiveLimitOfferRequest } from "../interfaces/LimitOffer.dto";

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
};  

export default new LimitOfferService();