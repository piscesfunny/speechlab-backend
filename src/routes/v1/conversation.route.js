const express = require('express');
const { conversationController } = require('../../controllers');
const auth = require("../../middlewares/auth");

const router = express.Router();

router
  .route('/')
  .post(auth('manageConversations'), conversationController.createConversation)
  .get(auth('manageConversations'), conversationController.getConversations)

router
  .route('/:conversationId')
  .get(auth('manageConversations'), conversationController.getConversation)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversation management and retrieval
 */
