const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

router.post("/events/create", async (req, res) => {
  //   console.log("route: /events/create");
  //   console.log(req.body.seats.orchestre);
  try {
    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      seats: {
        orchestre: req.body.seats.orchestre,
        mezzanine: req.body.seats.mezzanine,
      },
    });
    await newEvent.save();
    res.status(200).json({ message: "Event successfully created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/events/availabilities", async (req, res) => {
  try {
    // console.log(req.query);
    const events = await Event.find(req.query);
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/events", async (req, res) => {
  try {
    // console.log("route: /events");
    // console.log(req.query.id);
    const event = await Event.findById(req.query.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
