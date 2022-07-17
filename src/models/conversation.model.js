const mongoose = require('mongoose');

const { userSchema } = require('./user.model');
const { toJSON, paginate } = require('./plugins');

const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rawFilePath: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String
    },
    user: userSchema,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
conversationSchema.plugin(toJSON);
conversationSchema.plugin(paginate);

/**
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
