import express from "express";
import { config } from "dotenv";
import logger from "morgan";

// Router
import lightRouter from "./routes/light";
import sceneRouter from "./routes/scene";
import swaggerRouter from "./routes/swagger";

// Middleware
import { setupHueClient } from "./middleware/hueClient";
import { errorHandler } from "./middleware/errorhandler";

// Load .env variables
config();

const app = express();
const port = process.env.API_PORT || 8080;

app.use(
    logger((tokens, req, res) => {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            `Content-Length: ${tokens.res(req, res, "content-length")}`,
            "-",
            `Response Time: ${tokens["response-time"](req, res)}`,
        ].join(" ");
    })
);

app.use(setupHueClient);

app.use("/light", lightRouter);
app.use("/scene", sceneRouter);

app.use(errorHandler);
app.use("/api-docs", swaggerRouter);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
