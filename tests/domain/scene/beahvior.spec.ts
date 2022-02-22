import { Api } from "node-hue-api/dist/esm/api/Api";
import {
    fetchByName,
    activateByName,
    fetchAll,
} from "../../../src/domain/scene/behavior";
import { api, model } from "node-hue-api";

const getAllMock = jest.fn();
const getGroupMock = jest.fn();
const getSceneByNameMock = jest.fn();
const activateSceneMock = jest.fn();
const apiMock = {
    scenes: {
        getSceneByName: getSceneByNameMock,
        activateScene: activateSceneMock,
        getAll: getAllMock,
    },
    groups: {
        getGroup: getGroupMock,
    },
} as unknown as Api;

describe("getSceneByName", () => {
    it("No scene found", async () => {
        getSceneByNameMock.mockResolvedValueOnce([]);

        const scene = await fetchByName(apiMock, "Super Scene Name");
        expect(scene).toHaveLength(0);
    });

    it("Scene found", async () => {
        getSceneByNameMock.mockResolvedValueOnce([
            {
                name: "Super Scene Name",
            },
        ]);

        const scene = await fetchByName(apiMock, "Super Scene Name");
        expect(scene).toHaveLength(1);
    });
});

describe("activateSceneByName", () => {
    it("Happy Path", async () => {
        activateSceneMock.mockResolvedValueOnce(true);

        expect(
            await activateByName(apiMock, {
                id: "123",
            } as model.GroupScene)
        ).toBeUndefined;
    });
});

describe("fetchScenes", () => {
    it("Happy path", async () => {
        getAllMock.mockResolvedValueOnce([
            {
                id: "123",
                name: "Super Scene",
                group: "1",
            },
            {
                id: "456",
                name: "Super Second Scene",
                group: "2",
            },
            {
                id: "789",
                name: "Super Third Scene",
                group: "2",
            },
        ]);

        getGroupMock
            .mockResolvedValueOnce({
                name: "My first Group",
            })
            .mockResolvedValueOnce({
                name: "My second Group",
            });

        const scenes = await fetchAll(apiMock);

        expect(getGroupMock).toHaveBeenCalledTimes(2);
        expect(scenes).toStrictEqual([
            {
                id: "123",
                name: "Super Scene",
                group: {
                    name: "My first Group",
                },
            },
            {
                id: "456",
                name: "Super Second Scene",
                group: {
                    name: "My second Group",
                },
            },
            {
                id: "789",
                name: "Super Third Scene",
                group: {
                    name: "My second Group",
                },
            },
        ]);
    });
});
