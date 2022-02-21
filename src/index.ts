import express = require("express");
import { config } from "dotenv";

// Router
import lightRouter from "./routes/light";

// Load .env variables
config();

const app = express();
const port = process.env.API_PORT || 8080;

app.use("/light", lightRouter);

// const client = await v3.api.createLocal(process.env.HUE_BRIDGE_IP);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
