import express from 'express';
import Joi from 'joi';
import { LimitOfferType } from '../interfaces/ModelEnums';
import { BaseController } from "./BaseController";
import LimitOfferService from '../services/LimitOffer.service';

class LimitOfferController extends BaseController {
    async createLimitOffer(req: express.Request) {
        const schema = Joi.object({
            accountId: Joi.string().required(),
            limitType: Joi.string().valid(...Object.values(LimitOfferType)),
            newLimit: Joi.number().required(),
            offerActivationTime: Joi.number().required(),
            offerExpiryTime: Joi.number().required()
        });

        Joi.assert(req.body, schema);
        const response = await LimitOfferService.createLimitOffer(req.body);
        return response;
    }

    async getActiveLimitOffers(req: express.Request) {
        const schema = Joi.object({
            accountId: Joi.string().required(),
            activeDate: Joi.number().required()
        });
        Joi.assert(req.body, schema);

        const response = await LimitOfferService.getActiveLimitOffers(req.body);
        return response;
    }
};

export default new LimitOfferController();