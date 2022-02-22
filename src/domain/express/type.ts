import { Request } from "express";
import { Api } from "node-hue-api/dist/esm/api/Api";

export type HueRequest = Request & { hueClient: Api };
