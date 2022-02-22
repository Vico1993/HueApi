import { Api } from "node-hue-api/dist/esm/api/Api";
import { model } from "node-hue-api";
import { sceneGroups, sceneOutput, sceneGroup } from "./type";

const groups: sceneGroups = {};

export const fetchAll = async (client: Api): Promise<sceneOutput[]> => {
    const scenes = await client.scenes.getAll();

    const response: sceneOutput[] = [];
    for (const scene of scenes) {
        const groupId = (scene as model.GroupScene).group;

        if (!groups[groupId]) {
            const apiGroups = (await client.groups.getGroup(
                parseInt(groupId, 10)
            )) as model.Group;

            groups[groupId] = {
                name: apiGroups.name,
            };
        }

        response.push({
            id: scene.id as string,
            name: scene.name,
            group: groups[groupId] as sceneGroup,
        });
    }

    return response;
};

export const fetchByName = async (
    client: Api,
    name: string
): Promise<model.GroupScene[]> => {
    return (await client.scenes.getSceneByName(name)) as model.GroupScene[];
};

export const activateByName = async (client: Api, scene: model.GroupScene) => {
    await client.scenes.activateScene(scene.id as string);
};
