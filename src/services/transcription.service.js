const httpStatus = require('http-status');
const { Transcription } = require("../models")
const ApiError = require('../utils/ApiError');

/**
 * Create a transcription
 * @param {Object} transcriptionBody
 * @returns {Promise<Transcription>}
 */
const createTranscription = async (transcriptionBody) => {
  return Transcription.create(transcriptionBody)
};

/**
 * Create a transcription
 * @param {string} transcriptionId
 * @param {string} conversationId
 * @returns {Promise<Transcription>}
 */
const addTranscriptionToConversation = async (transcriptionId, conversationId) => {
  return Transcription.findByIdAndUpdate(
    transcriptionId,
    {conversation: conversationId},
    {new: true, useFindAndModify: false}
  );
};

/**
 * Query for transcriptions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.populate] - Populate options (default = '')
 * @returns {Promise<QueryResult>}
 */
const queryTranscriptions = async (filter, options) => {
  return Transcription.paginate(filter, options);
};

/**
 * Get transcription by id
 * @param {ObjectId} id
 * @returns {Promise<Transcription>}
 */
const getTranscriptionById = async (id) => {
  return Transcription.findById(id);
};

/**
 * Update transcription by id
 * @param {ObjectId} transcriptionId
 * @param {Object} updateBody
 * @returns {Promise<Transcription>}
 */
const updateTranscriptionById = async (transcriptionId, updateBody) => {
  const transcription = await getTranscriptionById(transcriptionId);
  if (!transcription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transcription not found');
  }
  Object.assign(transcription, updateBody);
  await transcription.save();
  return transcription;
};

module.exports = {
  createTranscription,
  addTranscriptionToConversation,
  queryTranscriptions,
  getTranscriptionById,
  updateTranscriptionById
}
