// Require router from express
const router = require('express').Router();

// Require the controllers created in the controllers folder for Thoughts

const {
  getAllThoughts,
  getOneThought,
  postThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// Set up GET all and POST
router.route('/').get(getAllThoughts).post(postThought);

// Set up GET one, PUT, and DELETE
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// Set up POST
router.route('/:thoughtId/reactions').post(postReaction);

// Set up DELETE
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;