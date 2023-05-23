const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/olympia-v2");

const Event = require("./models/Event");
const Ticket = require("./models/Ticket");

app.post("/events/create", async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
});

app.get("/events/availabilities", async (req, res) => {
  try {
    // console.log(req.query);
    const events = await Event.find(req.query);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/events", async (req, res) => {
  try {
    // console.log("route: /events");
    // console.log(req.query.id);
    const event = await Event.findById(req.query.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/tickets/book", async (req, res) => {
  const date = new Date();
  const event = await Event.findById(req.body.eventId);
  event.seats.category = event.seats.category - req.body.seats;
  const newTicket = new Ticket({
    mail: req.body.mail,
    username: req.body.username,
    date: date,
    category: req.body.category,
    seats: req.body.seats,
    event: req.body.EventId,
  });
  await newTicket.save();
  res.status(200).json({ message: `${req.body.seat} successfully booked` });
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("Server Started 🚀");
});
