const { Conversation } = require("../models")


/**
 * Create a conversation
 * @param {Object} conversationBody
 * @returns {Promise<Conversation>}
 */
const createConversation = async (conversationBody) => {
  return Conversation.create(conversationBody)
};

/**
 * Create a conversation
 * @param {string} conversationId
 * @param {string} userId
 * @returns {Promise<Conversation>}
 */
const addConversationToUser = async (conversationId, userId) => {
  return Conversation.findByIdAndUpdate(
    conversationId,
    {user: userId},
    {new: true, useFindAndModify: false}
  );
};

/**
 * Query for conversations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.populate] - Populate options (default = '')
 * @returns {Promise<QueryResult>}
 */
const queryConversations = async (filter, options) => {
  return Conversation.paginate(filter, options);
};

/**
 * Get conversation by id
 * @param {ObjectId} id
 * @returns {Promise<Conversation>}
 */
const getConversationById = async (id) => {
  return Conversation.findById(id);
};


module.exports = {
  createConversation,
  addConversationToUser,
  queryConversations,
  getConversationById
}
