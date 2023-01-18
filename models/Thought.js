// This is the Thought model
const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {},
  username: {
    type: String,
    required: true
  },
  reactions: [reaction]
},
{
  toJSON: {
    getters: true
  },
  id: false
});

thoughtSchema
  .virtual('reactions')
  .get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
