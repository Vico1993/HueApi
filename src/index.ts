import express from "express";
import { config } from "dotenv";

// Router
import lightRouter from "./routes/light";
import sceneRouter from "./routes/scene";

// Middleware
import { setupHueClient } from "./middleware/hueClient";

// Load .env variables
config();

const app = express();
const port = process.env.API_PORT || 8080;

app.use(setupHueClient);

app.use("/light", lightRouter);
app.use("/scene", sceneRouter);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
