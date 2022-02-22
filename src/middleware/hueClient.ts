import { NextFunction, Response } from "express";
import { v3 } from "node-hue-api";
import { HueRequest } from "../domain/express/type";

export const setupHueClient = async (
    req: HueRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        req.hueClient = await v3.api
            .createLocal(process.env.HUE_BRIDGE_IP)
            .connect(process.env.HUE_BRIDGE_USERNAME);
    } catch (error) {
        res.status(500).json({
            message: `Error setting up the HueClient ${
                (error as Error).message
            }`,
        });
    }

    next();
};
