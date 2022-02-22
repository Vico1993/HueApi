import { Request, Response } from "express";
import { model } from "node-hue-api";
import { Api } from "node-hue-api/dist/esm/api/Api";
import {
    activateScene,
    getAllScenes,
    getScene,
} from "../../src/controller/scene";
import * as behavior from "../../src/domain/scene/behavior";

const mockRequest = {
    body: {},
    query: {},
    params: {},
    hueClient: {} as Api,
} as unknown as Request;

const res = {
    status: function (code = 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.statusCode = code;
        return this;
    },
    statusCode: 0,
    json: jest.fn(),
    sendStatus: function (code = 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.statusCode = code;
        return this;
    },
} as Partial<Response>;

describe("getAllScenes", () => {
    it("Happy path", async () => {
        const scenes = [
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
        ];
        jest.spyOn(behavior, "fetchAll").mockResolvedValueOnce(scenes);

        await getAllScenes(mockRequest, res as Response);

        // @ts-ignore
        // Rules : @typescript-eslint/no-unsafe-member-access && @typescript-eslint/no-unsafe-assignment
        // For now it's impossible to remove the type any for .mock and .calls
        const mockResponse = res.json.mock.calls[0][0];

        expect(mockResponse).toMatchObject(scenes);
    });
});

describe("activateScene", () => {
    it("Happy path", async () => {
        jest.spyOn(behavior, "fetchByName").mockResolvedValueOnce([
            {
                id: "123",
            } as model.GroupScene,
        ]);
        jest.spyOn(behavior, "activateByName").mockImplementation(jest.fn());

        await activateScene(mockRequest, res as Response);

        // @ts-ignore
        // Rules : @typescript-eslint/no-unsafe-member-access && @typescript-eslint/no-unsafe-assignment
        // For now it's impossible to remove the type any for .mock and .calls
        const mockResponse = res.json.mock.calls[0][0];

        expect(mockResponse).toMatchObject({
            success: true,
        });
    });

    it("Scene not found", async () => {
        jest.spyOn(behavior, "fetchByName").mockResolvedValueOnce([]);

        await activateScene(mockRequest, res as Response);

        expect(res.statusCode).toBe(404);
    });
});

describe("getScene", () => {
    it("Happy path", async () => {
        jest.spyOn(behavior, "fetchByName").mockResolvedValueOnce([
            {
                id: "123",
            } as model.GroupScene,
        ]);

        await getScene(mockRequest, res as Response);

        // @ts-ignore
        // Rules : @typescript-eslint/no-unsafe-member-access && @typescript-eslint/no-unsafe-assignment
        // For now it's impossible to remove the type any for .mock and .calls
        const mockResponse = res.json.mock.calls[0][0];

        expect(mockResponse).toMatchObject([
            {
                id: "123",
            } as model.GroupScene,
        ]);
    });

    it("Scene not found", async () => {
        jest.spyOn(behavior, "fetchByName").mockResolvedValueOnce([]);

        await getScene(mockRequest, res as Response);

        expect(res.statusCode).toBe(404);
    });
});

afterEach(() => {
    jest.resetAllMocks();
});
