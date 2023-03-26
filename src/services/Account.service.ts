import { BaseService } from './Base.service';
import { CreateAccountRequest, GetAccountRequest } from '../interfaces/Account.dto';
import AccountRepo from '../repos/Account.repo';

class AccountService extends BaseService {

    async createAccount(params: CreateAccountRequest) {
        const customer_id = params.customer_id;
        const createdAccountDetails = await AccountRepo.createAccount(customer_id);
        return createdAccountDetails;
    }

    async getAccount(params: GetAccountRequest) {
        const account_id = params.account_id;
        const accountDetails = await AccountRepo.getAccount(account_id);
        return accountDetails;
    }

};

export default new AccountService();