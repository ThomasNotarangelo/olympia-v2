const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/olympia-v2");

const eventRoutes = require("./models/Event");
app.use(eventRoutes);
const ticketRoutes = require("./models/Ticket");
app.use(ticketRoutes);

app.post("/events/create", async (req, res) => {
  console.log("route: /events/create");
  console.log(req.body);
  try {
    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      seats: {
        orchestre: req.body.orchestre,
        mezzanine: req.body.mezzanine,
      },
    });
    await newEvent.save();
    res.status(200).json({ message: "Event successfully created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("Server Started 🚀");
});
