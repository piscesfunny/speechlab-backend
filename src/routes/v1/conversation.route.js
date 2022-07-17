const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/uploads/initialize-multipart-upload")
  .post(auth('manageConversations'), uploadController.initializeMultipartUpload)
router.route("/uploads/get-multipart-preSigned-urls")
  .post(auth('manageConversations'), uploadController.getMultipartPreSignedUrls)
router.route("/uploads/finalize-multipart-upload")
  .post(auth('manageConversations'), uploadController.finalizeMultipartUpload)

module.exports = router;
