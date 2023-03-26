import AccountModel from '../models/Account.model';

class AccountRepo {
    async createAccount(customer_id: String) {
        const newAccount = await AccountModel.create({ customer_id: customer_id });
        return newAccount;
    }

    async getAccount(account_id: String) {
        const accountDetails = await AccountModel.findById(account_id);
        return accountDetails;
    }
};

export default new AccountRepo();