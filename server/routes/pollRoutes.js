import express from 'express';
import { getPolls, createPoll, deletePoll, votePoll, getMyVote, getAllMyVotes } from '../controllers/pollController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getPolls)
  .post(protect, admin, createPoll);

router.route('/myvotes/all')
  .get(protect, getAllMyVotes);

router.route('/:id')
  .delete(protect, admin, deletePoll);

router.route('/:id/vote')
  .post(protect, votePoll);

router.route('/:id/myvote')
  .get(protect, getMyVote);

export default router;
