const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, default: '' },
  coverPhoto: { type: String, default: '' },
  type: { type: String, enum: ['public', 'private', 'secret'], default: 'public' },
  allowMemberPosts: { type: Boolean, default: true },
  allowMemberEvents: { type: Boolean, default: false },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);