import express = require("express");
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../openapi.json";

const router = express.Router();

router.use("/", swaggerUI.serve);
router.get(
    "/",
    swaggerUI.setup(swaggerDocument, {
        explorer: true,
    })
);

export default router;
