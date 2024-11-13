const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  commend: { type: String, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("Action", stateSchema);
