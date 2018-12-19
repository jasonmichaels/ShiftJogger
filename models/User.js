// capitalize and singular convention for model filenames

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  logs: [
    {
      title: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      shiftStart: {
        type: String,
        required: true
      },
      shiftEnd: {
        type: String
      },
      comments: {
        type: String
      },
      sent: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// `User`, variable
// mongoose.model("users", UserSchema) <-- last two: name of route, name of model

module.exports = User = mongoose.model("users", UserSchema);
