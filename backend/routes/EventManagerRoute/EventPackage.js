const express = require("express");
const EventPackageRoute = express.Router();
const EventController = require("../../controllers/EventController/EventPackageController");


EventPackageRoute.post("/create", EventController.addEventPackage);
EventPackageRoute.get("/", EventController.getAllEventPackage);
EventPackageRoute.get("/:id", EventController.getEventPackage);
EventPackageRoute.put("/update/:id", EventController.editEventPackage);
EventPackageRoute.delete("/delete/:id", EventController.deleteEventPackage);
EventPackageRoute.post("/uploadImage", EventController.UploadImage);

module.exports = EventPackageRoute;
