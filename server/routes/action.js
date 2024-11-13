let express = require("express");
const Action = require("../models/Action");
let { sendCommand } = require("../connect/mqtt");
let router = express.Router();

router.post("/action", (req, res) => {
  const { command } = req.body;
  console.log("command is " + command);
  sendCommand(command);
  if (command) res.status(200).send("command sent");
  else res.status(400).send("Cannot receive command");
});

router.get("/action/log", (req, res) => {
  Action.find()
    .sort({ time: -1 })
    .limit(20)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.error("Error fetching actions", err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
