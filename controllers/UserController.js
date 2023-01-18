// Require the user and thought models to be used in the user controllers
const { User, Thought } = require('../models');

// User controller methods
const userController = {
  // GET all users
  getAllUsers(request, response) {
    User.find()
      .select('-__v')
      .then(userData => response.json(userData))
      .catch(error => {
        console.log(error);
        response.status(400).json(error);
      });
  },

  //GET one user by id
  getOneUser(request, response) {
    User.findOne({ _id: request.params.id })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          response.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        response.json(userData);
      })
      .catch((error) => {
        console.log(error);
        response.status(400).json(error);
      });
  },

  // POST a new user
  createUser(request, response) {
    User.create(request.body)
      .then((userData) => response.json(userData))
      .catch((error) => {
        console.log(error)
        response.status(400).json(error)
      });
  },

  // PUT to update a user by id
  updateUser(request, response) {
    User.findOneAndUpdate(
      { _id: request.params.id },
      { $set: request.body },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          response.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        response.json(userData);
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error);
      });
  },

  // DELETE to remove user by id
  deleteUser(request, response) {
    User.findOneAndDelete({ _id: request.params.id })
      .then((userData) => {
        if (!userData) {
          response.status(404).json({ message: 'No user found with this id!' });
          return;
        }
      })
      .then(() => {
        response.json({ message: 'User deleted!' });
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error);
      })
  },

  // POST to add a new friend to a user's friends list
  addFriend(request, response) {
    User.findOneAndUpdate(
      { _id: request.params.userId },
      { $addToSet: { friends: request.params.friendId } },
      { new: true })
      .then((userData) => {
        if (!userData) {
          response.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        response.json(userData);
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error);
      })
  },

  // DELETE to remove a friend from a user's friends list
  deleteFriend(request, response) {
    User.findOneAndUpdate(
      { _id: request.params.userId },
      { $pull: { friends: request.params.friendId } },
      { new: true })
      .then((userData) => {
        if (!userData) {
          response.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        response.json(userData);
      })
      .catch((error) => {
        console.log(error)
        response.status(400).json(error);
      })
  }
};

// Export the user controller
module.exports = userController;