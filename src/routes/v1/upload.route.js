const express = require('express');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router.post("/initialize-multipart-upload", uploadController.initializeMultipartUpload)
router.post("/get-multipart-preSigned-urls", uploadController.getMultipartPreSignedUrls)
router.post("/finalize-multipart-upload", uploadController.finalizeMultipartUpload)

module.exports = router;
