const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
  messages: [messageSchema]
}, { timestamps: true });

threadSchema.pre('validate', function(next) {
  const hasGroup = Boolean(this.group);
  const hasEvent = Boolean(this.event);
  if ((hasGroup && hasEvent) || (!hasGroup && !hasEvent)) {
    return next(new Error('Un fil de discussion doit être lié soit à un groupe, soit à un événement, mais pas les deux.'));
  }
  next();
});

module.exports = mongoose.model('Thread', threadSchema);