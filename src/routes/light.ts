import express = require("express");
import { getAllLights } from "../controller/lightController";

const lightRouter = express.Router();

lightRouter.route("/").get(getAllLights);

export default lightRouter;
