const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/olympia-v2");

const eventRoutes = require("./routes/event");
app.use(eventRoutes);

const ticketRoutes = require("./routes/ticket");
app.use(ticketRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("Server Started 🚀");
});
