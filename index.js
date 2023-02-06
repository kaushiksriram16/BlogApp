const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./dbconfig");
const blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth")
// const reviewRouter = require("./routers/review");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/blog", blogRouter);

app.use("/api/auth", authRouter);

var listener = app.listen(3000, async function () {
  try {
    await connect().then(console.log("Connected successfully"));
  } catch (err) {
    console.log("Error: ", err.message);
  }
  // console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;