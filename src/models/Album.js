const mongoose = require('mongoose');

const photoCommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [photoCommentSchema],
  createdAt: { type: Date, default: Date.now }
});

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  photos: [photoSchema]
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);