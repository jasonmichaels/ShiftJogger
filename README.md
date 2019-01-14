# Geckos-Team-18: ShiftJogger

## Purpose

ShiftJogger is a work-log and invoice-tracking web app, providing users with the ability to create, edit, and send invoices via Sendgrid's email service.

Our objective was to create a React app, using Next.js and Redux, complete with a custom back end to handle user registration, logins, session authentication, as well as various POST/GET/DELETE requests.

## Usage

To start, you'll need an mLab API key, as well as a custom `secret` key. For development, these should go in the root directory's `config` folder in a file named `keys_dev.js`. Note that the `secret` key is entirely up to you and is only used for session authentication within and for use with ShiftJogger itself. Since we utilized Sendgrid, development keys for that service should also go here. The file structure may look like:

```
module.exports = {
  MONGODB_URI:
    "<mongodb://mLab_KEY>",
  secretOrKey: "<SECRET_KEY>",
  SENDGRID_API_KEY: "<SENDGRID_API_KEY>",
  cloudinary_cloud_name: "<CLOUDINARY_CLOUD_NAME>",
  cloudinary_api_key: "<CLOUDINARY_API>",
  cloudinary_api_secret: "<CLOUDINARY_PAI_SECRET>",
  jsreportUser: "<JSREPORT_AUTH_USERNAME>",
  jsreportPassword: "<JSREPORT_AUTH_USER_PW>"
};
```

In production, if you utilize Heroku (we do), these will go under the app's Settings `process.env` vars, with the keys and values matching those used in development.

## Installation

To run, clone or download the repo to your local machine. Note that the root directory contains the server files, with the client-side (React, etc.) files housed in the `client` folder. As such, barring changes to the development process in our `package.json` scripts, you'll want to start at the root with `npm i` to install the back-end dependencies, and then navigate to the root of the client folder and run `npm i` to install the front-end dependencies.

To run the app in development, following installation of all server-side and client-side dependencies, navigate to the root directory and enter `npm run dev`. This will queue up the server, which by default listens on `localhost:5000`, as well as the client app, which runs on `localhost:3000` by default.

## Demo

A Heroku-hosted version of ShiftJogger is available at our [ShiftJogger](https://shift-jogger-app.herokuapp.com/) site.

## Dependencies

As detailed in the server-side and client-side `package.json` files, this project utilizes (at present) the following dependencies:

### Server

- [Sendgrid](https://www.npmjs.com/package/@sendgrid/mail)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cloudinary](https://www.npmjs.com/package/cloudinary)
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

## TODO

- 1/11/19: Reduce width of the "Duration" input fields, probably by moving their labels to the left side of the field, so the input takes up half currend width. Most likely solution: Create separate class for start/end input fields, such that the title can occupy the left 50% of the section, and the input field the right 50%. Possibly need to create columns within TextField.js? Work with the input title fonts to make a bit more prominent.
- 1/12/19: <body> and <div id="root"> sections seem to be 100% of screen height, not 100% of content height, meaning the background color added today cuts off about 80% of the way down the screen when scrolling to bottom.
  1/12/19: New grouping for content on Dashboard: buttons closer to each other, less white space/padding. Also need to add "new draft" button to dashboard--currently only found on nav-bar.

## Contributors

As of 12/11/2018, `drunkenkismet` is the sole contributor to this project, although he's actively recruiting from the Chingu Voyage 7 cohort to help with front-end design, back-end design and testing, overall code cleanup, and -- eventually -- testing with Enzyme/Jest.

On 1/4/2019, `volantTyler` joined the development team. His initial focus will be on front-end design and code cleanup.

## Project Status

As of 1/14/19, the barebones of the project are in place. The front-end design is ongoing, but it showcases the essential funcitonality of the MVP. Users can register, login and logout, and session authentication works per an authentication HOC for protected routes. Users may log and edit hours, as well as add comments to logs. Lots of opportunities to extend functionality on the front end, including providing users a way to group logs together so they're sent as part of the same invoice.

The back end is also largely in place, with the remaining pieces being more resilient error-handling, division of routes, code-cleanup, and possibly utilizing jsreport server-side rather than hitting up their own `jsreport online` API. However, the back-end interface functions as intended at this point. Users are able to send single invoices, although the ShiftJogger domain has yet to be purchased (which would decrease incidences of spam warning by popular email providers). This process first generates a PDF via jsreport, saves the resultant PDF response server-side to ShiftJogger (rather than streaming a result) to Cloudinary, and then the PDF's cloud URL is sent via email to a recipient. Users may also, at any time, view sent PDFs directly from the Sent component.

Soon, too, users will be able to archive sent invoices, and the Dashboard component will provide more granular information concerning logs. For example, ratings of experiences, the ability to factor per-hour or by-project payments into logs and invoices, pagination for the Draft and Sent components, and improved search functionality that takes advantage of MongoDB's more complex queries options rather than (currently) a largely JavaScript-dependent log-searching process. Other ideas are in the works as well, with the front-end aesthetic being paramount in the coming weeks.

Finally, it's important to note my (drunkenkismet's) relative newness to React, Redux, Node, and MongoDB. However, I feel the process has been illuminating. Aside from `volantTyler`'s recent help with portions of the front end, I completed the bulk of this project solo. As such, there's a ton of room for improvement, from security, UX/UI, code efficiency, etc. Having fallback options for jsreport, Cloudinary, and SendGrid implementations would also be userful. And aspects of the Redux flow require tweaking to account for varying server-side responses. I intend to maintain this project for some time in hopes that, by Spring, 2019, it's of a substantially improved form and demonstrates my commitment to useful, performant web applications.

Thanks to Chingu for the opportunity to work on this project, and to `volantTyler` for aiding me toward the end (and also for his continued assistance)!
