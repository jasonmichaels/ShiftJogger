module.exports = {
  login: {
    email: {
      required: "Email is a required field",
      invalid: "Email field is invalid"
    },
    password: {
      required: "Blarghity is a required field",
      invalid: "Password is invalid or incorrect"
    }
  },
  register: {
    name: {
      required: "Name field is required",
      invalid: "Name must be between 2 and 30 characters"
    },
    email: {
      required: "Email is a required field",
      invalid: "Email is invalid"
    },
    password: {
      required: "Password is a required field",
      invalid: "Password must be between 6 and 30 characters"
    },
    password2: {
      required: "Please, confirm your password",
      invalid: "Passwords must match"
    }
  },
  log: {
    title: {
      required: "Log title is a required field",
      invalid: "Log titles must be between 60 and 100 characters"
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
      invalid: "Destination email is invalid"
    },
    fromEmail: {
      required: "Your email is a required field",
      invalid: "Your email is invalid"
    },
    subject: {
      required: "Subject line is a required field",
      invalid: "Subject line must be at least 4 characters long"
    }
  }
};
