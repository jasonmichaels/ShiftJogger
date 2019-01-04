# Geckos-Team-18: Shift-Logger

## Purpose

ShiftJogger is a work-log and invoice-tracking web app, providing users with the ability to create, edit, and send invoices via Sendgrid's email service.

Our objective was to create a React app, using Next.js and Redux, complete with a custom back end to handle user registration, logins, session authentication, as well as various POST/GET/DELETE requests.

## Usage

To start, you'll need an mLab API key and a custom `secret` key. For development, these should go in the root directory's `config` folder in a file named `keys_dev.js`. Since we utilized Sendgrid, development keys for that service should also go here. The file structure may look like:

```
module.exports = {
  mongoURL:
    "mongodb://<mLab_KEY_HERE>",
    secretOrKey: "<SECRET_KEY_HERE>",
    SENDGRID_API_KEY: "<SENDGRID_API_KEY_HERE"
};
```

In production, if you utilize Heroku (we do), these will go under the app's Settings `process.env` vars, with the keys and values matching those used in development.

## Installation

To run, clone or download the repo to your local machine. Note that the root directory contains the server files, with the client-side (React, etc.) files housed in the `client` folder. As such, barring changes to the development process in our `package.json` scripts, you'll want to start at the root with `npm i` to install the back-end dependencies, and then navigate to the root of the client folder and run `npm i` to install the front-end dependencies.

To run the app in development, following installation of all server-side and client-side dependencies, navigate to the root directory and enter `npm run dev`. This will queue up the server, which by default listens on `localhost:5000`, as well as the client app, which runs on `localhost:3000` by default.

## Demo

A Heroku-hosted version of ShiftJogger is available at our [ShiftJogger](https://lit-ridge-25934.herokuapp.com/) site.

## Dependencies

As detailed in the server-side and client-side `package.json` files, this project utilizes (at present) the following dependencies:

### Server

- [Sendgrid](https://www.npmjs.com/package/@sendgrid/mail)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [concurrently](https://www.npmjs.com/package/concurrently) (for development and Heroku deployment)
- [Express](https://www.npmjs.com/package/express)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [moment.js](https://www.npmjs.com/package/moment)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Passport](https://www.npmjs.com/package/passport)
- [Passport-jwt](https://www.npmjs.com/package/passport-jwt)
- [Validator](https://www.npmjs.com/package/validator)
- and [Nodemon](https://www.npmjs.com/package/nodemon) (for development)
- as well as the obvious ones: [Node](https://www.npmjs.com/package/node) and [NPM](https://www.npmjs.com/package/npm)

### Client

- Material-UI [Core](https://www.npmjs.com/package/@material-ui/core) and [Icons](https://www.npmjs.com/package/@material-ui/icons)
- [Axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [JWT-Decode](https://www.npmjs.com/package/jwt-decode)
- [moment.js](https://www.npmjs.com/package/moment)
- [React](https://www.npmjs.com/package/react) (16.6.3)
- [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [React-Datetime](https://www.npmjs.com/package/react-datetime)
- [React-Dom](https://www.npmjs.com/package/react-dom)
- [React-Moment](https://www.npmjs.com/package/react-moment)
- [React-Redux](https://www.npmjs.com/package/react-redux)
- [React-Router-DOM](https://www.npmjs.com/package/react-router-dom)
- [React-Scripts](https://www.npmjs.com/package/react-scripts) (for development and deployment)
- [Redux](https://www.npmjs.com/package/redux)
- [Redux-Devtools-Extension](https://www.npmjs.com/package/redux-devtools-extension) (for development, but will update to `Redux-Devtools-Extension/developmentOnly at a later date)
- [Redux-Thunk](https://www.npmjs.com/package/redux-thunk) (middleware)
- and [Styled-Components](https://www.npmjs.com/package/styled-components)

## Contributors

As of 12/11/2018, `drunkenkismet` is the sole contributor to this project, although he's actively recruiting from the Chingu Voyage 7 cohort to help with front-end design, back-end design and testing, overall code cleanup, and -- eventually -- testing with Enzyme/Jest.

On 1/4/2019, `volantTyler` joined the development team. His initial focus will be on front-end design and code cleanup.