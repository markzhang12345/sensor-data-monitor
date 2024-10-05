const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  temperature: { type: Number, required: true },
  pressure: { type: Number, required: true },
  depth: { type: Number, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("State", stateSchema);
