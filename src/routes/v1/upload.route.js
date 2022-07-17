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

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Upload management and retrieval
 */

/**
 * @swagger
 * /uploads/initialize-multipart-upload:
 *   post:
 *     summary: Initialize multipart upload
 *     description: This API takes care of initializing a multipart upload request.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: foo.mp3
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  fileId:
 *                    type: string
 *                  fileKey:
 *                    type: string
 *                example:
 *                  fileId: FZOTbjkwBfqMpQWn84TFwH2I_uvOiqYIQ7CqoivRdeF9OiujfeRCMsQcBS3r09o5gHLpnNk_WUh0jNyBWd7qL6Y8m75ixBJ6nzpDsKqkpr.vAhueZymcms0MyuTPI7A7
 *                  fileKey: 1658097561082_foo.mp3
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /uploads/get-multipart-preSigned-urls:
 *   post:
 *     summary: Get multipart PreSigned urls
 *     description: This API is responsible for returning the pre-signed URLs associated with the parts involved in the multipart request.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileKey
 *               - fileId
 *               - parts
 *             properties:
 *               fileKey:
 *                 type: string
 *               fileId:
 *                 type: string
 *               parts:
 *                 type: integer
 *             example:
 *               fileKey: 1658097561082_foo.mp3
 *               fileId: FZOTbjkwBfqMpQWn84TFwH2I_uvOiqYIQ7CqoivRdeF9OiujfeRCMsQcBS3r09o5gHLpnNk_WUh0jNyBWd7qL6Y8m75ixBJ6nzpDsKqkpr.vAhueZymcms0MyuTPI7A7
 *               parts: 2
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  parts:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        signedUrl:
 *                          type: string
 *                        PartNumber:
 *                          type: integer
 *                example:
 *                  parts: [
 *                    {
 *                      "signedUrl": "https://speechlab-incoming.s3.us-west-1.amazonaws.com/1658097561082_foo.mp3?AWSAccessKeyId=AKIA6OA6ZTOXSGZQ3SRF&Expires=1658099561&Signature=aUFXi0aFGHdbr1Uu%2BdIKG3h%2F48M%3D&partNumber=1&uploadId=FZOTbjkwBfqMpQWn84TFwH2I_uvOiqYIQ7CqoivRdeF9OiujfeRCMsQcBS3r09o5gHLpnNk_WUh0jNyBWd7qL6Y8m75ixBJ6nzpDsKqkpr.vAhueZymcms0MyuTPI7A7",
 *                      "PartNumber": 1
 *                    },
 *                    {
 *                      "signedUrl": "https://speechlab-incoming.s3.us-west-1.amazonaws.com/1658097561082_foo.mp3?AWSAccessKeyId=AKIA6OA6ZTOXSGZQ3SRF&Expires=1658099561&Signature=UwIqYPAxBzPNIWAKvb5vflrkhMg%3D&partNumber=2&uploadId=FZOTbjkwBfqMpQWn84TFwH2I_uvOiqYIQ7CqoivRdeF9OiujfeRCMsQcBS3r09o5gHLpnNk_WUh0jNyBWd7qL6Y8m75ixBJ6nzpDsKqkpr.vAhueZymcms0MyuTPI7A7",
 *                      "PartNumber": 2
 *                    }
 *                  ]
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /uploads/finalize-multipart-upload:
 *   post:
 *     summary: Finalize multipart upload
 *     description: This last API finalizes a multipart upload request.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileKey
 *               - fileId
 *               - parts
 *             properties:
 *               fileKey:
 *                 type: string
 *               fileId:
 *                 type: string
 *               parts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     PartNumber:
 *                       type: integer
 *                     ETag:
 *                       type: string
 *             example:
 *               fileKey: 1658097561082_foo.mp3
 *               fileId: FZOTbjkwBfqMpQWn84TFwH2I_uvOiqYIQ7CqoivRdeF9OiujfeRCMsQcBS3r09o5gHLpnNk_WUh0jNyBWd7qL6Y8m75ixBJ6nzpDsKqkpr.vAhueZymcms0MyuTPI7A7
 *               parts: [
 *                 {
 *                   PartNumber: 1
 *                   ETag: 1ae8648057211da6c0b7a423dc58d682
 *                 },
 *                 {
 *                   PartNumber: 2
 *                   ETag: 3e67121dc11358f93eb1c08eac19529b
 *                 }
 *               ]
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
