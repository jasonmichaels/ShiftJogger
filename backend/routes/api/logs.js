// create, edit, delete logs
// authentication, logins, passport

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Log = require("../../models/Log");
const validateLogInput = require("../../validation/logs");

// @route   GET api/logs/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Posts Works"
  })
);

// @route   POST api/logs
// @desc    Create log
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLogInput(req.body);
    if (!isValid) {
      // if errors, send 400 with errors obj
      return res.status(400).json(errors);
    }
    const newLog = new Log({
      title: req.body.title,
      date: req.body.date,
      shiftStart: req.body.startTime,
      shiftEnd: req.body.endTime,
      comments: req.body.comments,
      sent: req.body.sent,
      user: req.user.id
    });
    newLog.save().then(log => res.json(log));
  }
);

// @route   GET api/logs
// @desc    Get logs
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Log.find()
      // look into this mongoose syntax -- it sorts by date, but not sure what the -1 value does
      .sort({ date: -1 })
      .then(logs => res.json(logs))
      .catch(err =>
        res.status(404).json({ noLogsFound: "No logs found" + err })
      );
  }
);

// @route   GET api/logs/:id
// @desc    Get log by ID
// @access  Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Log.findById(req.params.id)
      .then(log => res.json(log))
      .catch(err =>
        res.status(404).json({ noLogFound: "No log found with that ID" + err })
      );
  }
);

// @route   Delete api/logs/:id
// @desc    Delete log by ID
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Log.findById(req.params.id)
        .then(log => {
          // check for post owner
          if (log.user.toString() !== req.user.id) {
            // unauthorized status
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized" });
          }
          // delete
          log.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ logNotFound: "No log found by that ID" })
        );
    });
  }
);

// @route   post api/logs/send/:id
// @desc    Send log
// @access  Private

router.post(
  "/send/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Log.findById(req.params.id)
        .then(log => {
          if (log.sent) {
            return res
              .status(400)
              .json({ alreadySent: "User already sent this log" });
          }
          // need to inject actually utilizing third-party API
          // to send log/invoice to user's destination email
          log.sent = true;
          log.sent.date = Date.now();
          log.save().then(log => res.json(log));
        })
        .catch(err => res.status(404).json({ error: err }));
    });
  }
);

module.exports = router;
