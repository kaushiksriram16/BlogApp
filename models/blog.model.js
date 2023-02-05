const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: ObjectId },
  createdOn: { type: Date, default: new Date() },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
