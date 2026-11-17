const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [optionSchema],
    validate: [arr => arr.length >= 2, 'Une question doit avoir au moins 2 réponses possibles.']
  }
});

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: {
    type: [questionSchema],
    validate: [arr => arr.length >= 1, 'Un sondage doit comporter au moins 1 question.']
  }
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);