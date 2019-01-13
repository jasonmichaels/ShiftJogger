const fs = require("fs");
const path = require("path");
const request = require("request");
const cloudinary = require("cloudinary");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.SENDGRID_API_KEY);

const templateId = "d-bda5260c19af423e9ee86450f8f197ff";

const PDFBuildProcess = {};

PDFBuildProcess.buildPDF = (name, id, log) => {
  return new Promise((resolve, reject) => {
    const { finalStartDate, shiftStart, finalDateEnd, shiftEnd, hours } = log;
    const content = {
      name,
      finalStartDate,
      shiftStart,
      finalDateEnd,
      shiftEnd,
      hours
    };

    const hash = new Buffer.from(
      `${keys.jsreportUser}:${keys.jsreportPassword}`
    ).toString("base64");

    const data = {
      template: {
        shortid: "ksTF7CJ"
      },
      data: content
    };

    const options = {
      url: "https://shiftjogger.jsreportonline.net/api/report",
      method: "POST",
      strictSSL: false,
      rejectUnauthorized: false,
      json: true,
      headers: {
        "content-type": "application/json",
        Authorization: "Basic " + hash
      },
      body: data
    };

    const pathToPdf = path.join(__dirname, "tmp", `${id}-${log._id}.pdf`);

    request(options)
      .on("end", () => {
        resolve(pathToPdf);
      })
      .pipe(fs.createWriteStream(pathToPdf));
  });
};

PDFBuildProcess.savePDF = pathToPdf => {
  return new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: `${keys.cloudinary_cloud_name}`,
      api_key: `${keys.cloudinary_api_key}`,
      api_secret: `${keys.cloudinary_api_secret}`
    });
    cloudinary.v2.uploader.upload(pathToPdf, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

PDFBuildProcess.emailPDF = (req, user, cloudinaryResponse) => {
  // do the sending, such as calling third-party API here
  return new Promise((res, rej) => {
    const msg = {
      to: req.body.destEmail,
      from: req.body.fromEmail,
      templateId: templateId,
      dynamic_template_data: {
        userName: user.name,
        subject: req.body.subject,
        link: cloudinaryResponse.url
      }
    };
    sgMail
      .send(msg)
      .then(sent => {
        res({ sent: true, sentData: sent });
      })
      .catch(err => rej({ sent: false, err }));
  });
};

module.exports = PDFBuildProcess;
