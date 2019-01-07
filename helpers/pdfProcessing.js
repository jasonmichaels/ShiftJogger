const PDFDocument = require("pdfkit");
const fs = require("fs");
const cloudinary = require("cloudinary");
const keys = require("../config/keys");

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

PDFBuildProcess.emailPDF = () => {
  console.log("emailing");
};

module.exports = PDFBuildProcess;
