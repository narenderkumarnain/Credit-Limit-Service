/**
 * Request Wrapper
 * Responsibilities:
 *  - Logging
 *  - Monitoring
 *  - Error Handling
 */
import express from "express";

export function RequestMonitor(controllerMethod: (req: express.Request) => Promise<any>)
    : (req: express.Request, res: express.Response) => Promise<any> {
    return async function(req: express.Request, res: express.Response) {
        try {
            const response = await controllerMethod(req);
            console.log(req.route.path, response); // console will be replaced by logger
            return res.status(200).send(response);
        } catch(err: any) {
            console.log(`${req.route.path}_error`, err);
            return res.status(err.statusCode || 500).send({ message: err.message });
        }
    }
}
