import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  optionIndex: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Ensure a user can only vote once per poll
voteSchema.index({ user: 1, poll: 1 }, { unique: true });

export default mongoose.model('Vote', voteSchema);
