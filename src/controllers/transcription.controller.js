const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { transcriptionService } = require('../services');


const createTranscription = catchAsync(async (req, res) => {
  let transcription = await transcriptionService.createTranscription(req.body);
  transcription = await transcriptionService.addTranscriptionToConversation(transcription._id, req.params.conversationId)

  res.status(httpStatus.CREATED).send({ transcription });
});

const getTranscriptions = catchAsync(async (req, res) => {
  const originalFilter = pick(req.query, ['speaker']);
  const filter = {...originalFilter, 'conversation': req.params.conversationId}
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await transcriptionService.queryTranscriptions(filter, options);
  res.send(result);
});

const getTranscription = catchAsync(async (req, res) => {
  const transcription = await transcriptionService.getTranscriptionById(req.params.transcriptionId);
  if (!transcription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transcription not found');
  }
  res.send(transcription);
});

const updateTranscription = catchAsync(async (req, res) => {
  const transcription = await transcriptionService.updateTranscriptionById(req.params.transcriptionId, req.body);
  res.send(transcription);
});

module.exports = {
  createTranscription,
  getTranscriptions,
  getTranscription,
  updateTranscription
};
