const moment = require("moment");

const template = ({
  name,
  finalStartDate,
  shiftStart,
  finalDateEnd,
  shiftEnd,
  hours
}) => {
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
          <style>
            .container {
              margin-top: 100px;
            }
            .saluation {
              text-align: right;
            }
          </style>
      </head>
      <body>
          <div class="container">
              <h1 class="title mt-4">Invoice from ${name}</h1>
              <table class="table mt-4">
                  <thead>
                      <tr>
                          <th>Start Day</th>
                          <th>Start Time</th>
                          <th>End Day</th>
                          <th>End Time</th>
                          <th>Hours</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>${finalStartDate}</td>
                          <td>${shiftStart}</td>
                          <td>${finalDateEnd}</td>
                          <td>${shiftEnd}</td>
                          <td>${hours}</td>
                      </tr>
                  </tbody>
              </table>
              <p class="saluation mt-4">Your friends at ShiftJogger!</p>
          </div>
      </body>
    </html>
  `;
  return content;
};

module.exports = template;
