const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  balance: { type: Number, default: 1000 },
});

module.exports = mongoose.model("Player", playerSchema);
