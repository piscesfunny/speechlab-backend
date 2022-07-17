const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/initialize-multipart-upload")
  .post(auth('manageUploads'), uploadController.initializeMultipartUpload)
router.route("/get-multipart-preSigned-urls")
  .post(auth('manageUploads'), uploadController.getMultipartPreSignedUrls)
router.route("/finalize-multipart-upload")
  .post(auth('manageUploads'), uploadController.finalizeMultipartUpload)

module.exports = router;
