import Poll from '../models/Poll.js';
import Vote from '../models/Vote.js';

// @desc    Get all polls
// @route   GET /api/polls
// @access  Private
export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a poll
// @route   POST /api/polls
// @access  Private/Admin
export const createPoll = async (req, res) => {
  try {
    const { question, options, durationMinutes } = req.body;
    
    // Default to 24 hours if not specified
    const minutes = durationMinutes || 24 * 60;
    const expiresAt = new Date(Date.now() + minutes * 60000);

    const formattedOptions = options.map(opt => ({ text: opt, votes: 0 }));

    const poll = new Poll({
      question,
      options: formattedOptions,
      expiresAt,
      createdBy: req.user._id
    });

    const createdPoll = await poll.save();
    
    // Emit new poll event globally
    req.io.emit('pollCreated', createdPoll);

    res.status(201).json(createdPoll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a poll
// @route   DELETE /api/polls/:id
// @access  Private/Admin
export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (poll) {
      await Vote.deleteMany({ poll: poll._id });
      await poll.deleteOne();
      
      req.io.emit('pollDeleted', req.params.id);
      
      res.json({ message: 'Poll removed' });
    } else {
      res.status(404).json({ message: 'Poll not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Vote on a poll
// @route   POST /api/polls/:id/vote
// @access  Private
export const votePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    const { optionIndex } = req.body;

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (poll.status === 'expired') {
      return res.status(400).json({ message: 'Poll has expired' });
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({ user: req.user._id, poll: poll._id });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted on this poll' });
    }

    // Record the vote
    await Vote.create({
      user: req.user._id,
      poll: poll._id,
      optionIndex
    });

    // Increment vote count atomically
    poll.options[optionIndex].votes += 1;
    await poll.save();

    // Emit live update
    req.io.emit('voteUpdate', {
      pollId: poll._id,
      optionIndex,
      votes: poll.options[optionIndex].votes
    });

    req.io.emit('pollUpdated', poll);



    res.json({ message: 'Vote recorded successfully', poll });
  } catch (error) {
    if(error.code === 11000) {
      res.status(400).json({ message: 'You have already voted on this poll' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Check user's vote for a specific poll
// @route   GET /api/polls/:id/myvote
// @access  Private
export const getMyVote = async (req, res) => {
  try {
    const vote = await Vote.findOne({ user: req.user._id, poll: req.params.id });
    if (vote) {
      res.json({ voted: true, optionIndex: vote.optionIndex });
    } else {
      res.json({ voted: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's all votes
// @route   GET /api/polls/myvotes/all
// @access  Private
export const getAllMyVotes = async (req, res) => {
  try {
    const votes = await Vote.find({ user: req.user._id });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
