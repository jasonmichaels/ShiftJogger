module.exports = {
  login: {
    email: {
      required: "Email is a required field",
      invalid: "Email is invalid or incorrect"
    },
    password: {
      required: "Password is a required field",
      length: "Password must be between 6 and 30 characters"
    }
  },
  register: {
    name: {
      required: "Name field is required",
      length: "Name must be between 4 and 30 characters"
    },
    email: {
      required: "Email is a required field",
      invalid: "Email is a invalid or incorrect"
    },
    password: {
      required: "Password is a required field",
      length: "Password must be between 6 and 30 characters"
    },
    password2: {
      required: "Please, confirm your password",
      invalid: "Passwords must match"
    }
  },
  log: {
    title: {
      required: "Log title is a required field",
      length: "Log titles must be between 6 and 50 characters"
    },
    dateStart: {
      required: "Log start date is a required field"
    },
    shiftStart: {
      required: "Log start time is a required field"
    }
  },
  send: {
    destEmail: {
      required: "Destination email is a required field",
      invalid: "Destination email is a required field"
    },
    fromEmail: {
      required: "Your email is a required field",
      invalid: "Your email is a required field"
    },
    subject: {
      required: "Subject line is a required field",
      length: "Subject line must be at least 4 characters long"
    }
  }
};
