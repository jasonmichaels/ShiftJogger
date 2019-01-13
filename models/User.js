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
    unique: true,
    lowercase: true,
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
      dateStart: {
        type: Date,
        required: true
      },
      finalStartDate: {
        type: String
      },
      dateEnd: {
        type: Date
      },
      finalDateEnd: {
        type: String
      },
      checked: {
        type: Boolean
      },
      shiftStart: {
        type: String,
        required: true
      },
      shiftEnd: {
        type: String
      },
      hours: {
        type: Number
      },
      comments: {
        type: String
      },
      sent: {
        type: Boolean,
        default: false
      },
      displayed: {
        type: Boolean,
        default: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      cloudinary: {
        type: Object
      },
      sentData: {
        type: Object
      }
    }
  ]
});

// `User`, variable
// mongoose.model("users", UserSchema) <-- last two: name of route, name of model

module.exports = User = mongoose.model("users", UserSchema);
