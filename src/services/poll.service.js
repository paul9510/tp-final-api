const Poll = require('../models/Poll');

const createPoll = async (data) => {
  return await Poll.create(data);
};

const searchPolls = async (query) => {
  const filter = {};
  if (query.group) filter.group = query.group;
  if (query.event) filter.event = query.event;

  return await Poll.find(filter)
    .populate('createdBy', 'firstName lastName email')
    .populate('options.votes', 'firstName lastName email');
};

const getPollById = async (id) => {
  return await Poll.findById(id)
    .populate('createdBy', 'firstName lastName email')
    .populate('options.votes', 'firstName lastName email');
};

const deletePoll = async (id) => {
  return await Poll.findByIdAndDelete(id);
};

const votePoll = async (pollId, optionId, userId) => {
  const poll = await Poll.findById(pollId);
  if (!poll) return null;

  poll.options.forEach(opt => {
    opt.votes = opt.votes.filter(id => id.toString() !== userId);
  });

  const targetOption = poll.options.id(optionId);
  if (!targetOption) {
    const err = new Error('Option introuvable');
    err.status = 404;
    throw err;
  }

  targetOption.votes.push(userId);
  await poll.save();
  return poll;
};

module.exports = {
  createPoll,
  searchPolls,
  getPollById,
  deletePoll,
  votePoll
};