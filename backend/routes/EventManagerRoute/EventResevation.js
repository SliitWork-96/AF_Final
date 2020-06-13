const express = require("express");
const EventReservationRoute = express.Router();
const EventReservationController = require("../../controllers/EventController/EventReservationController");


EventReservationRoute.post("/create", EventReservationController.addEvent);
EventReservationRoute.get("/", EventReservationController.getAllEvent);
EventReservationRoute.get("/:id", EventReservationController.getEvent);
EventReservationRoute.put("/update/:id", EventReservationController.editEvent);
EventReservationRoute.delete("/delete/:id", EventReservationController.deleteEvent);

module.exports = EventReservationRoute;