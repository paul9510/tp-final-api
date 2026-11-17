const Group = require('../models/Group');
const Event = require('../models/Event');

const createGroup = async (data) => {
  const { admins = [], members = [] } = data;
  if (admins.length === 0) {
    throw new Error('Un groupe doit être géré par au moins 1 administrateur.');
  }
  const uniqueMembers = [...new Set([...members.map(String), ...admins.map(String)])];
  return await Group.create({ ...data, members: uniqueMembers });
};

const searchGroups = async (query) => {
  const filter = {};
  if (query.name) filter.name = { $regex: query.name, $options: 'i' };
  if (query.type) filter.type = query.type;

  return await Group.find(filter).populate('admins members', 'firstName lastName email');
};

const getGroupById = async (id) => {
  return await Group.findById(id).populate('admins members', 'firstName lastName email');
};

const updateGroup = async (id, data) => {
  return await Group.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const deleteGroup = async (id) => {
  return await Group.findByIdAndDelete(id);
};

const addMember = async (groupId, userId) => {
  return await Group.findByIdAndUpdate(
    groupId,
    { $addToSet: { members: userId } },
    { new: true }
  );
};

const removeMember = async (groupId, userId) => {
  const group = await Group.findById(groupId);
  if (!group) return null;

  if (group.members.length <= 1) {
    throw new Error('Un groupe doit posséder au moins 1 membre.');
  }

  const remainingAdmins = group.admins.filter(id => id.toString() !== userId);
  if (remainingAdmins.length === 0) {
    throw new Error('Impossible de retirer le dernier administrateur du groupe.');
  }

  group.members = group.members.filter(id => id.toString() !== userId);
  group.admins = remainingAdmins;
  return await group.save();
};

const addAdmin = async (groupId, userId) => {
  return await Group.findByIdAndUpdate(
    groupId,
    { $addToSet: { admins: userId, members: userId } },
    { new: true }
  );
};

const createGroupEvent = async (groupId, eventData) => {
  const group = await Group.findById(groupId);
  if (!group) return null;

  const { creatorId } = eventData;
  const isAdmin = group.admins.some(id => id.toString() === creatorId);
  const isMember = group.members.some(id => id.toString() === creatorId);

  if (!isAdmin && !(isMember && group.allowMemberEvents)) {
    const err = new Error('Vous n’êtes pas autorisé à créer un événement dans ce groupe.');
    err.status = 403;
    throw err;
  }

  return await Event.create({
    ...eventData,
    group: group._id,
    visibility: group.type === 'public' ? 'public' : 'private',
    organizers: [creatorId],
    participants: group.members
  });
};

module.exports = {
  createGroup,
  searchGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addMember,
  removeMember,
  addAdmin,
  createGroupEvent
};