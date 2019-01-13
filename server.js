/* imports */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
// separate logs endpoints into separate routes file and add here, along with guest views

const app = express();

// Body parser middleware -- used in users.js
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB config
const db = require("./config/keys");

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db.mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config (passport jwt strategy)
require("./config/passport")(passport);

// user routes
app.use("/api/users", users);

// static prod assets
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("/*", (req, res) =>
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
  );
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
