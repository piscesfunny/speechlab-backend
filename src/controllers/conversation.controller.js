const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { conversationService } = require('../services');

const createConversation = catchAsync(async (req, res) => {
  const { fileKey } = req.body
  let conversationName = fileKey.replace(/^.*[\\\/]/, '').split(".")[0]
  const conversationBody = {
    name: conversationName,
    rawFilePath: fileKey
  }
  let conversation = await conversationService.createConversation(conversationBody);

  conversation = await conversationService.addConversationToUser(conversation._id, req.user._id)

  res.status(httpStatus.CREATED).send({ conversation });
});

const getAllConversations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const originalOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const options = {...originalOptions, 'populate': 'user'}
  const result = await conversationService.queryConversations(filter, options);
  res.send(result);
});

const getConversations = catchAsync(async (req, res) => {
  const originalFilter = pick(req.query, ['name']);
  const filter = {...originalFilter, 'user': req.params.userId}
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await conversationService.queryConversations(filter, options);
  res.send(result);
});

const getConversation = catchAsync(async (req, res) => {
  const conversation = await conversationService.getConversationById(req.params.conversationId);
  if (!conversation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Conversation not found');
  }
  res.send(conversation);
});

module.exports = {
  getAllConversations,
  getConversations,
  getConversation,
  createConversation,
};
