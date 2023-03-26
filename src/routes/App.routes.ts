import express from 'express';
import { RequestMonitor } from "../middlewares/RequestWrapper";
import CommonController from "../controllers/CommonController";
import AccountController from '../controllers/AccountController';
import LimitOfferController from '../controllers/LimitOfferController';

const router = express.Router();

router.get('/app/check', RequestMonitor(CommonController.getHealthCheck));

router.post('/app/account/create', RequestMonitor(AccountController.createAccount));
router.get('/app/account/get', RequestMonitor(AccountController.getAccount));

router.post('/app/limitOffer/create', RequestMonitor(LimitOfferController.createLimitOffer));
router.get('/app/limitOffer/getActiveOffers', RequestMonitor(LimitOfferController.getActiveLimitOffers));

export default router;