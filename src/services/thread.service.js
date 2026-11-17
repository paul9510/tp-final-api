const Thread = require('../models/Thread');
const Group = require('../models/Group');
const Event = require('../models/Event');

const createThread = async (data) => await Thread.create(data);

const searchThreads = async (query) => {
  const filter = {};
  if (query.title) filter.title = { $regex: query.title, $options: 'i' };
  if (query.group) filter.group = query.group;
  if (query.event) filter.event = query.event;

  return await Thread.find(filter)
    .populate('group', 'name')
    .populate('event', 'name')
    .populate('messages.author messages.comments.author', 'firstName lastName email');
};

const getThreadById = async (id) => {
  return await Thread.findById(id)
    .populate('group', 'name')
    .populate('event', 'name')
    .populate('messages.author messages.comments.author', 'firstName lastName email');
};

const updateThread = async (id, data) => {
  return await Thread.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteThread = async (id) => {
  return await Thread.findByIdAndDelete(id);
};

const checkUserMembership = async (thread, userId, isNewMessage = false) => {
  if (thread.group) {
    const group = await Group.findById(thread.group);
    if (!group) throw new Error('Groupe associé introuvable.');
    const isAdmin = group.admins.some(id => id.toString() === userId);
    const isMember = group.members.some(id => id.toString() === userId);

    if (!isAdmin && !isMember) {
      const err = new Error('Vous devez être membre du groupe pour interagir.');
      err.status = 403;
      throw err;
    }
    if (isNewMessage && !isAdmin && !group.allowMemberPosts) {
      const err = new Error('Les membres ne sont pas autorisés à publier dans ce groupe.');
      err.status = 403;
      throw err;
    }
  } else if (thread.event) {
    const event = await Event.findById(thread.event);
    if (!event) throw new Error('Événement associé introuvable.');
    const isAllowed = event.organizers.some(id => id.toString() === userId) ||
                      event.participants.some(id => id.toString() === userId);
    if (!isAllowed) {
      const err = new Error('Vous devez être participant ou organisateur de l’événement.');
      err.status = 403;
      throw err;
    }
  }
};

const addMessage = async (threadId, messageData) => {
  const thread = await Thread.findById(threadId);
  if (!thread) return null;

  await checkUserMembership(thread, messageData.author, true);

  thread.messages.push(messageData);
  await thread.save();
  return thread.messages;
};

const addComment = async (threadId, messageId, commentData) => {
  const thread = await Thread.findById(threadId);
  if (!thread) return null;

  await checkUserMembership(thread, commentData.author, false);

  const message = thread.messages.id(messageId);
  if (!message) {
    const err = new Error('Message introuvable');
    err.status = 404;
    throw err;
  }

  message.comments.push(commentData);
  await thread.save();
  return message.comments;
};

module.exports = {
  createThread,
  searchThreads,
  getThreadById,
  updateThread,
  deleteThread,
  addMessage,
  addComment
};