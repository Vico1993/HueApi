import { v3 } from "node-hue-api";
import asyncHandler from "../middleware/async";

// type sceneOutput = {
//     name: string;
//     id: string;
// };

export const getAllScenes = asyncHandler(async (req, res) => {
    const client = await v3.api
        .createLocal(process.env.HUE_BRIDGE_IP)
        .connect(process.env.HUE_BRIDGE_USERNAME);

    const scenes = await client.scenes.getAll();

    const response = scenes.map((scene) => {
        return {
            id: scene.id,
            name: scene.name,
        };
    });

    res.status(200).json(response);
});

export const activateScene = asyncHandler(async (req, res) => {
    const sceneName = req.params.name;

    const client = await v3.api
        .createLocal(process.env.HUE_BRIDGE_IP)
        .connect(process.env.HUE_BRIDGE_USERNAME);

    const scene = await client.scenes.getSceneByName(sceneName);

    if (!scene) {
        res.sendStatus(404);
    }

    await client.scenes.activateScene(scene[0].id as string);

    res.status(200).json({
        success: true,
    });
});

export const getScene = asyncHandler(async (req, res) => {
    const sceneName = req.params.name;

    const client = await v3.api
        .createLocal(process.env.HUE_BRIDGE_IP)
        .connect(process.env.HUE_BRIDGE_USERNAME);

    const scene = await client.scenes.getSceneByName(sceneName);

    if (!scene) {
        res.sendStatus(404);
    }

    res.status(200).json(scene);
});
