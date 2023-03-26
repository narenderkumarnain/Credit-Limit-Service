/**
 * Account Controller Methods
 */

import express from "express";
import Joi from "joi";
import {BaseController} from "./BaseController";
import AccountService from '../services/Account.service';

class AccountController extends BaseController {
    async createAccount(req: express.Request) {
        // Params Validation 
        const schema = Joi.object({
            customer_id: Joi.string().required()
        });
        Joi.assert(req.body, schema);

        const response = await AccountService.createAccount(req.body);
        return response;
    }

    async getAccount(req: express.Request) {
        const schema = Joi.object({
            account_id: Joi.string().required()
        });
        Joi.assert(req.body, schema);
        const response = await AccountService.getAccount(req.body);
        return response;
    }
}

export default new AccountController();