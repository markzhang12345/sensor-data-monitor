let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let cors = require("cors");

require("./connect/mqtt.js");
//
let statesRouter = require("./routes/states");
//

let app = express();

// 连接mongoodb
mongoose
  .connect(
    "mongodb+srv://admin:admin@mc.zecgw.mongodb.net/?retryWrites=true&w=majority&appName=mc"
  )
  .then(() => console.log("mongodb connect"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", statesRouter);

module.exports = app;
