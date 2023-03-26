import express from "express";
import { InvalidRequest } from "../commons/Errors";
import {BaseController} from "./BaseController";

class CommonController extends BaseController {
    async getHealthCheck(req: express.Request) {
        // throw new InvalidRequest("Invalid req format");
        return { message: "HealthCheck successful"};
    }
}

export default new CommonController();