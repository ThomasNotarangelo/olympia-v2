const express = require("express");

const router = express.Router();
const Ticket = require("../models/Ticket");

router.post("/tickets/book", async (req, res) => {
  try {
    const date = new Date();
    const event = await Event.findById(req.body.eventId);
    //   console.log(req.body.seats);
    if (
      req.body.seats > 4 ||
      req.body.seats < 1 ||
      (req.body.category !== "mezzanine" && req.body.category !== "orchestre")
    ) {
      return res.status(400).json({ message: "Invalid request" });
    }
    if (event.seats[req.body.category] < req.body.seats) {
      return res
        .status(400)
        .json({ message: "Not enough available seats for this category" });
    }
    event.seats[req.body.category] -= req.body.seats;
    await event.save();

    const newTicket = new Ticket({
      mail: req.body.mail,
      username: req.body.username,
      date: date,
      category: req.body.category,
      seats: req.body.seats,
      event: req.body.eventId,
    });
    await newTicket.save();
    res
      .status(200)
      .json({ message: `${req.body.seats} seats successfully booked` });

    //   console.log(event.seats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find({
      mail: req.body.mail,
    }).populate("event");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
