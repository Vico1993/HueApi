import { Response } from "express";
import { HueRequest } from "../domain/express/type";
import {
    activateByName,
    fetchAll,
    fetchByName,
} from "../domain/scene/behavior";
import asyncHandler from "../middleware/async";

export const getAllScenes = asyncHandler(
    async (req: HueRequest, res: Response) => {
        res.status(200).json(await fetchAll(req.hueClient));
    }
);

export const activateScene = asyncHandler(
    async (req: HueRequest, res: Response) => {
        const scene = await fetchByName(req.hueClient, req.params.name);

        if (!scene.length) {
            res.sendStatus(404);
            return;
        }

        await activateByName(req.hueClient, scene[0]);

        res.status(200).json({
            success: true,
        });
    }
);

export const getScene = asyncHandler(async (req: HueRequest, res: Response) => {
    const scene = await fetchByName(req.hueClient, req.params.name);

    if (!scene.length) {
        res.sendStatus(404);
        return;
    }

    res.status(200).json(scene);
});
