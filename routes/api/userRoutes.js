// Require router from express
const router = require('express').Router();
// Require the controllers created in the controllers folder for User

const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// Set up GET all and POST
router.route('/').get(getAllUsers).post(createUser);

// Set up GET one, PUT, and DELETE
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

// Set up POST and DELETE
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;