const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema

const LogSchema = new Schema({
  // associate user with profile
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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
        type: Date,
        required: true
      },
      shiftEnd: {
        type: Date,
        required: true
      },
      comments: {
        type: String
      },
      sent: {
        type: Boolean,
        default: false,
        date: {
          type: Date,
          default: null
        }
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Log = mongoose.model("logs", LogSchema);
