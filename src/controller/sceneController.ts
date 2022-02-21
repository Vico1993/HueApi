import { model, v3 } from "node-hue-api";
import asyncHandler from "../middleware/async";

type sceneOutput = {
    id: string;
    name: string;
    group: {
        name: string;
    };
};

type groups = {
    [key: number]: {
        name: string;
    };
};

const groups: groups = {};

export const getAllScenes = asyncHandler(async (req, res) => {
    const client = await v3.api
        .createLocal(process.env.HUE_BRIDGE_IP)
        .connect(process.env.HUE_BRIDGE_USERNAME);

    const scenes = await client.scenes.getAll();

    const response: sceneOutput[] = [];
    for (const scene of scenes) {
        const groupId = (scene as model.GroupScene).group;

        if (!groups[groupId]) {
            const apiGroups = await client.groups.getGroup(
                parseInt(groupId, 10)
            );

            groups[groupId] = {
                name: apiGroups.name,
            };
        }

        response.push({
            id: scene.id as string,
            name: scene.name,
            group: groups[groupId],
        });
    }

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
