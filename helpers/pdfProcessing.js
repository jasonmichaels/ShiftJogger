const PDFDocument = require("pdfkit");
const fs = require("fs");
const cloudinary = require("cloudinary");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.SENDGRID_API_KEY);

const templateId = "d-bda5260c19af423e9ee86450f8f197ff";

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
      /*
      text: "tester text",
      html: `<div class="card is-centered">
              <h1>${user.name} has sent you an invoice!</h1>
              <br> 
              <a href=${
                cloudinaryResponse.url
              } class="btn btn-primary">View Invoice</a>
             </div>`

      */
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
