import express = require("express");
import { activateScene, getAllScenes, getScene } from "../controller/scene";

const sceneRouter = express.Router();

sceneRouter.route("/").get(getAllScenes);
sceneRouter.route("/:name").get(getScene);
sceneRouter.route("/:name").put(activateScene);

export default sceneRouter;
