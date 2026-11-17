const threadService = require('../services/thread.service');

exports.create = async (req, res) => {
  const thread = await threadService.createThread(req.body);
  res.status(201).json(thread);
};

exports.getAll = async (req, res) => {
  const threads = await threadService.searchThreads(req.query);
  res.status(200).json(threads);
};

exports.getOne = async (req, res) => {
  const thread = await threadService.getThreadById(req.params.id);
  if (!thread) return res.status(404).json({ error: 'Fil de discussion introuvable' });
  res.status(200).json(thread);
};

exports.update = async (req, res) => {
  const thread = await threadService.updateThread(req.params.id, req.body);
  if (!thread) return res.status(404).json({ error: 'Fil de discussion introuvable' });
  res.status(200).json(thread);
};

exports.remove = async (req, res) => {
  const thread = await threadService.deleteThread(req.params.id);
  if (!thread) return res.status(404).json({ error: 'Fil de discussion introuvable' });
  res.status(200).json({ message: 'Fil de discussion supprimé' });
};

exports.addMessage = async (req, res) => {
  const messages = await threadService.addMessage(req.params.id, req.body);
  if (!messages) return res.status(404).json({ error: 'Fil de discussion introuvable' });
  res.status(201).json(messages);
};

exports.addComment = async (req, res) => {
  const comments = await threadService.addComment(req.params.id, req.params.messageId, req.body);
  if (!comments) return res.status(404).json({ error: 'Fil de discussion introuvable' });
  res.status(201).json(comments);
};