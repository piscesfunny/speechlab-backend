const { Conversation } = require("../models")


/**
 * Create a conversation
 * @param {Object} conversationBody
 * @returns {Promise<Conversation>}
 */
const createConversation = async (conversationBody) => {
  return await Conversation.create(conversationBody)
};

module.exports = {
  createConversation
}
