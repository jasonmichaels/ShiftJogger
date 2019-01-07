const PDFDocument = require("pdfkit");
const fs = require("fs");
const cloudinary = require("cloudinary");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.SENDGRID_API_KEY);

const PDFBuildProcess = {};

PDFBuildProcess.buildPDF = (user, log) => {
  // make the PDF
  return new Promise((res, rej) => {
    const doc = new PDFDocument();
    const stream = doc.pipe(
      fs.createWriteStream(`${__dirname}/../pdf/tmp/${user._id}-${log._id}.pdf`)
    );
    doc.text(`${user.name}`, 100, 100);
    doc.end();
    stream.on("finish", () => {
      console.log("finished");
      res(`${__dirname}/../pdf/tmp/${user._id}-${log._id}.pdf`);
    });
  });
};

PDFBuildProcess.savePDF = PDFPath => {
  return new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: `${keys.cloudinary_cloud_name}`,
      api_key: `${keys.cloudinary_api_key}`,
      api_secret: `${keys.cloudinary_api_secret}`
    });
    cloudinary.v2.uploader.upload(PDFPath, (err, res) => {
      resolve(res);
    });
  });
};

PDFBuildProcess.emailPDF = (req, user, log, cloudinaryResponse) => {
  // do the sending, such as calling third-party API here
  return new Promise((res, rej) => {
    const msg = {
      to: `${req.body.destEmail}`,
      from: `${req.body.fromEmail}`,
      subject: `${req.body.subject}`,
      text: "tester text",
      html: `<strong>This is a test</strong><a href=${
        cloudinaryResponse.url
      }><button>View PDF</button></a>`
    };
    sgMail.send(msg);
    res({ sent: true });
  });
};

module.exports = PDFBuildProcess;
