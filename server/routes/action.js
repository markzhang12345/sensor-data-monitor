let express = require("express");
let sendCommand = require("../connect/mqtt");
let router = express.Router();

router.post("/action", (req, res) => {
  const commend = req.commend;
  sendCommand(commend);
  if (commend) res.status(200).send("Advance commend sent");
  else res.status(400).send("Cannot receive commend");
});

module.exports = router;
