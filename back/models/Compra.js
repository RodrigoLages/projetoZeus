const mongoose = require("mongoose");

const Compra = mongoose.model("Compra", {
  cost: Number,
  obs: String,
  date: String,
  userID: String,
});

module.exports = Compra;
