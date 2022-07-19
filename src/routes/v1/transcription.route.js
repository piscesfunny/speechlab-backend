const express = require('express');
const { transcriptionController } = require('../../controllers');
const auth = require("../../middlewares/auth");

const router = express.Router();

router
  .route('/conversation/:conversationId')
  .post(auth('manageConversations'), transcriptionController.createTranscription)
  .get(auth('manageConversations'), transcriptionController.getTranscriptions)

router.route('/:transcriptionId')
  .get(auth('manageConversations'), transcriptionController.getTranscription)
  .patch(auth('manageConversations'), transcriptionController.updateTranscription)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transcriptions
 *   description: Transcription management and retrieval
 */

/**
 * @swagger
 * /transcriptions/conversation/{conversationId}:
 *   post:
 *     summary: Create a transcription
 *     description: .
 *     tags: [Transcriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - language
 *             properties:
 *               language:
 *                 type: string
 *                 enum: [english, spanish]
 *               speaker:
 *                 type: string
 *               content:
 *                 type: string
 *               timeline:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transcription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get conversation specific transcriptions
 *     description:
 *     tags: [Transcriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation id
 *       - in: query
 *         name: speaker
 *         schema:
 *           type: string
 *         description: Speaker name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transcription'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /transcriptions/{transcriptionId}:
 *   get:
 *     summary: Get a transcription
 *     description:
 *     tags: [Transcriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transcriptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Transcription id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transcription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a transcription partially
 *     description:
 *     tags: [Transcriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transcriptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Transcription id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 enum: [english, spanish]
 *               speaker:
 *                 type: string
 *               content:
 *                 type: string
 *               timeline:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transcription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
