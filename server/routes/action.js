let express = require("express");
let sendCommand = require("../connect/mqtt");
let router = express.Router();

router.post("/action", (req, res) => {
  const commend = req.commend;
  sendCommand(commend);
  res.status(200).send("Advance command sent");
});

module.exports = router;
