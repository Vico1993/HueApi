import { Response } from "express";
import asyncHandler from "../middleware/async";
import { HueRequest } from "../domain/express/type";

export const getAllLights = asyncHandler(
    async (req: HueRequest, res: Response) => {
        const lights = await req.hueClient.lights.getAll();

        res.status(200).json(lights);
    }
);
