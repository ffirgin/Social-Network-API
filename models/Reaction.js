// This is the reaction schema
const { Schema, Types } = require('mongoose');

// This is the reaction schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {}
},
{
  toJSON: {
    getters: true
  },
  id: false
});

module.exports = reactionSchema;