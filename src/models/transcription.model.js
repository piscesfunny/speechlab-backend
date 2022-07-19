const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');
const { languages } = require('../config/languages');

const transcriptionSchema = mongoose.Schema(
  {
    language: {
      type: String,
      enum: [languages.ENGLISH, languages.SPANISH],
      required: true,
    },
    speaker: {
      type: String
    },
    content: {
      type: String
    },
    timeline: {
      type: String
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation"
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transcriptionSchema.plugin(toJSON);
transcriptionSchema.plugin(paginate);

/**
 * @typedef Transcription
 */
const Transcription = mongoose.model('Transcription', transcriptionSchema);

module.exports = Transcription;
