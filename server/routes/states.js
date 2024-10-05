let express = require("express");
const State = require("../models/State");
let router = express.Router();

router.get("/states/nowstate", (req, res) => {
  State.findOne()
    .sort({ time: -1 })
    .then((state) => {
      res.status(200).json(state);
    })
    .catch((err) => {
      console.error("Error fetching state", err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/states/history", (req, res) => {
  State.find()
    .sort({ time: -1 })
    .limit(20) // 显示20条
    .then((states) => {
      res.status(200).json(states);
    })
    .catch((err) => {
      console.error("Error fetching states", err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;