const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", true);

const connect = () => {
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connect;
