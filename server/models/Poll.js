import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: { type: String, required: true },
    votes: { type: Number, default: 0 }
  }],
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Poll', pollSchema);
