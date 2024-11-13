let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let cors = require("cors");

require("./connect/mqtt.js");
//
let statesRouter = require("./routes/states");
let actionRouter = require("./routes/action");
//

let app = express();

function clearDatabase() {
  return mongoose.connection.db.collections().then((collections) => {
    let dropPromises = collections.map((collection) => {
      return collection
        .drop()
        .then(() => {
          console.log(`已清空集合: ${collection.collectionName}`);
        })
        .catch((error) => {
          if (error.message === "ns not found") {
            console.log(`集合 ${collection.collectionName} 不存在，跳过`);
          } else {
            console.error(`删除集合 ${collection.collectionName} 时出错: ${error}`);
          }
        });
    });
    return Promise.all(dropPromises);
  });
}

// 连接mongoodb
mongoose
  .connect("mongodb+srv://admin:admin@mc.zecgw.mongodb.net/?retryWrites=true&w=majority&appName=mc")
  .then(() => {
    console.log("mongodb connect");
    return clearDatabase();
  });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", statesRouter);
app.use("/", actionRouter);

module.exports = app;
