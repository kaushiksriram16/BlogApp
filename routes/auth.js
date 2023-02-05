const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
        if (await User.findOne({ email: req.body.email })) {
        throw new Error("Account already exists with this email");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({...req.body, password: hashedPassword});
        
        const {password, ...others} = newUser._doc;
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return res.status(201).json({user: others, token});
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            throw new Error("Invalid credentials");
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassword) {
            throw new Error("Invalid credentials");
        }
        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"});

        return res.status(201).json({ user: others, token });
    } catch(error){
        res.status(500).json(error.message);
    }
});

module.exports = router;
