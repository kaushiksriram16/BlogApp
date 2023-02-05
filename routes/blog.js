const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.model");
const checkToken = require('../middleware/checkToken');

//get all Blogs
router.get("/getAll", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.json(err.message);
  }
});

//Add a blog
router.post("/add", checkToken, async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user.id,
    createdOn: new Date(),
  });
  try {
    const b = await Blog.create(blog);
    res.json(b);
  } catch (err) {
    res.json(err.message);
  }
});

//Edit a blog
router.put("/:id", checkToken, async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(req.user.id == blog.createdBy){
      try {
        const title = req.body.title;
        const description = req.body.description;
        blog.title = title;
        blog.description = description;
        const b = await blog.save();
        res.json(b);
      } catch (err) {
        res.json(err.message);
      }
    }
    else{
      throw new Error("You don't have access to edit this");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Delete a blog
router.delete("/:id", checkToken,async (req, res) => {
  try {
    const id = req.params.id;
    const b = await Blog.findById(id);
    if(req.user.id == b.createdBy){
      b.delete();
      res.json(b);
    }
    else{
      throw new Error("You don't have access to delete this")
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
