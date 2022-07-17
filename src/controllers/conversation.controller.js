const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, conversationService } = require('../services');

const createConversation = catchAsync(async (req, res) => {
  const { fileKey } = req.body
  let conversationName = fileKey.replace(/^.*[\\\/]/, '').split(".")[0]
  const conversationBody = {
    name: conversationName,
    rawFilePath: fileKey,
    user: req.user
  }
  const conversation = await conversationService.createConversation(conversationBody);

  res.status(httpStatus.CREATED).send({ conversation });
});

const getConversations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getConversation = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

module.exports = {
  createConversation,
  getConversations,
  getConversation,
};
