import express = require("express");
import { activateScene, getAllScenes } from "../controller/sceneController";

const sceneRouter = express.Router();

sceneRouter.route("/").get(getAllScenes);
sceneRouter.route("/:name").put(activateScene);

export default sceneRouter;
