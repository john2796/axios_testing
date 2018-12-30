// User API Routes % JWT Authentication

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "users Works" }));

// User Registationas
// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post(`/register`, (req, res) => {
  //Find if email exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating pg
        d: "mm" //default mm
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      // hash encrypt password using bcryptjs
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Email & Password Login
// @route  GET api/users/Login
// @desc   Login User / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User by Email
  User.findOne({ email }).then(user => {
    // Chech for user
    if (!user) {
      // 404 means not found
      return res.status(404).json({ email: "User not Found" });
    }
    // Check Password since password is hashed we need to use bycrpty to compare if it's true
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create the Jason Web Token (JWT)
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
