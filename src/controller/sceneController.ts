import { Response } from "express";
import { HueRequest } from "../domain/express/type";
import {
    activateSceneByName,
    fetchScenes,
    getSceneByName,
} from "../domain/scene/behavior";
import asyncHandler from "../middleware/async";

export const getAllScenes = asyncHandler(
    async (req: HueRequest, res: Response) => {
        res.status(200).json(await fetchScenes(req.hueClient));
    }
);

export const activateScene = asyncHandler(
    async (req: HueRequest, res: Response) => {
        const scene = await getSceneByName(req.hueClient, req.params.name);

        if (!scene) {
            res.sendStatus(404);
        }

        await activateSceneByName(req.hueClient, scene[0]);

        res.status(200).json({
            success: true,
        });
    }
);

export const getScene = asyncHandler(async (req: HueRequest, res: Response) => {
    const scene = await getSceneByName(req.hueClient, req.params.name);

    if (!scene) {
        res.sendStatus(404);
    }

    res.status(200).json(scene);
});
