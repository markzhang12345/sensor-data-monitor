let express = require("express");
let { sendCommand } = require("../connect/mqtt");
let router = express.Router();

router.post("/action", (req, res) => {
  const { command } = req.body;
  console.log("command is " + command);
  sendCommand(command);
  if (command) res.status(200).send("command sent");
  else res.status(400).send("Cannot receive command");
});

module.exports = router;
