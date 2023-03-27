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

    async updateAccount(account_id: String, updateDoc: any) {
        await AccountModel.findByIdAndUpdate(account_id, updateDoc);
    }
};

export default new AccountRepo();