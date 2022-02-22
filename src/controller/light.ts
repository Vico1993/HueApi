import { v3 } from "node-hue-api";
import asyncHandler from "../middleware/async";

export const getAllLights = asyncHandler(async (req, res) => {
    const client = await v3.api
        .createLocal(process.env.HUE_BRIDGE_IP)
        .connect(process.env.HUE_BRIDGE_USERNAME);

    res.status(200).json(await client.lights.getAll());
});
