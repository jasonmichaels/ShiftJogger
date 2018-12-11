// authentication, logins, passport

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// may not need mongoose since the users model utilizes it
const mongoose = require("mongoose");

// load user model
// capitalize for schema
const User = require("../../models/User");

// in server.js, the base route is already given, directing to this router.
// once here, the request will be routed to one of the following methods and routes.

// @route   GET api/users/register
// @desc    register user
// @access  Public

router.post("/register", (req, res) => {
  // destructuring of `req`, with the body passed to the helper function
  // in `is-empty.js`, which checks strings and objects to see if they're empty
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  !isValid ? res.status(400).json(errors) : null;
  User.findOne({
    // access what req is sending through req.body,
    // then individual props of the body
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      res.status(400).json(errors);
    } else {
      // create newUser based on req object body data
      const newUser = new User({
        name: req.body.name,
        // maybe don't allow password to travel as pw at all?
        password: req.body.password,
        email: req.body.email
      });
      // encrypt/hash password
      bcrypt.genSalt(10, (err, salt) => {
        // @params: pw, salt, callback w/ err and hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // else
          newUser.password = hash; // set newUser object's password to the hash
          // .save method provided by mongoose?...
          newUser
            .save()
            // user gets sent back and turned into a JSON object
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    login user / return json web token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (isValid) {
    return res.status(400).json(errors);
  }
  // send form via req
  const email = req.body.email;
  const password = req.body.password;
  // find user by email
  User.findOne({
    email
  }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User not found";
      // not found w/ errors displayed client-side
      return res.status(404).json(errors);
    }
    // if user, match password
    // bcrypt to compare plain text password (first param)
    // submitted by user to hashed pw (second param) stored in db
    bcrypt.compare(password, user.password).then(matched => {
      if (matched) {
        // if match, generate token
        // create jwt payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // sign token
        // takes payload when sent to server,
        // as well as key (imported from config file)
        // and an object with an expiry timeframe
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            // need to determine best expiry timeframe
            expiresIn: 6000
          },
          (err, token) => {
            // gives back an error or token
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "Password is invalid or incorrect.";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    return user to which token belongs
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // req.user will return the full user, including password --
    // don't want to return that!
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
