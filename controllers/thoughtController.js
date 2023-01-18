// Require the user and thought models to be used in the thought controllers
const { User, Thought } = require('../models');

// Thought controller methods
const thoughtController = {
  // GET all thoughts
  getAllThoughts(request, response) {
    Thought.find()
      .then(thoughtData => response.json(thoughtData))
      .catch(error => {
        console.log(error);
        response.status(400).json(error);
      });
  },

  // GET one thought by id
  getOneThought(request, response) {
    Thought.findOne({ _id: request.params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          response.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        response.json(thoughtData);
      })
      .catch((error) => {
        console.log(error);
        response.status(400).json(error);
      });
  },

  // POST a new Thought
  postThought(request, response) {
    Thought.create(request.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: request.params.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          response.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        response.json({ message: 'Thought created' });
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error)
      })
  },

  // PUT to update a thought by id
  updateThought(request, response) {
    Thought.findOneAndUpdate(
      { _id: request.params.id },
      { $set: request.body },
      { runValidators: true, new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          response.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        response.json(thoughtData);
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error)
      });
  },

  // DELETE to remove a thought by id
  deleteThought(request, response) {
    Thought.findByIdAndDelete(
      { _id: request.params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          response.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        response.json({ message: 'Thought deleted' })
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error)
      });
  },

  // POST to create a reaction stored in a single thought's reactions array field
  postReaction(request, response) {
    Thought.findOneAndUpdate(
      { _id: request.params.id },
      { $addToSet: { reactions: request.body } },
      { runValidators: true, new: true })
    .then((thoughtData) => {
      if (!thoughtData) {
        response.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      response.json(thoughtData);
    })
    .catch((error) => {
      console.log(error)
      response.status(400).json(error)
    })
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(request, response) {
    Thought.findOneAndUpdate(
      { _id: request.params.id },
      { $pull: { reactions: { reactionId: request.params.reactionId } } },
      { runValidators: true, new: true })
    .then((thoughtData) => {
      if (!thoughtData) {
        response.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      response.json(thoughtData);
    })
    .catch((error) => {
      console.log(error)
      response.status(400).json(error)
    });
  }
};

// Export the thought controller
module.exports = thoughtController;