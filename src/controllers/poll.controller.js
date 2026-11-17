const pollService = require('../services/poll.service');

exports.create = async (req, res) => {
  const poll = await pollService.createPoll(req.body);
  res.status(201).json(poll);
};

exports.getAll = async (req, res) => {
  const polls = await pollService.searchPolls(req.query);
  res.status(200).json(polls);
};

exports.getOne = async (req, res) => {
  const poll = await pollService.getPollById(req.params.id);
  if (!poll) return res.status(404).json({ error: 'Sondage introuvable' });
  res.status(200).json(poll);
};

exports.remove = async (req, res) => {
  const poll = await pollService.deletePoll(req.params.id);
  if (!poll) return res.status(404).json({ error: 'Sondage introuvable' });
  res.status(200).json({ message: 'Sondage supprimé' });
};

exports.vote = async (req, res) => {
  const poll = await pollService.votePoll(req.params.id, req.params.optionId, req.body.userId);
  if (!poll) return res.status(404).json({ error: 'Sondage introuvable' });
  res.status(200).json(poll);
};