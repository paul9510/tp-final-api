const groupService = require('../services/group.service');

exports.create = async (req, res) => {
  const group = await groupService.createGroup(req.body);
  res.status(201).json(group);
};

exports.getAll = async (req, res) => {
  const groups = await groupService.searchGroups(req.query);
  res.status(200).json(groups);
};

exports.getOne = async (req, res) => {
  const group = await groupService.getGroupById(req.params.id);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(200).json(group);
};

exports.update = async (req, res) => {
  const group = await groupService.updateGroup(req.params.id, req.body);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(200).json(group);
};

exports.remove = async (req, res) => {
  const group = await groupService.deleteGroup(req.params.id);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(200).json({ message: 'Groupe supprimé' });
};

exports.addMember = async (req, res) => {
  const group = await groupService.addMember(req.params.id, req.body.userId);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(200).json(group);
};

exports.removeMember = async (req, res) => {
  const group = await groupService.removeMember(req.params.id, req.params.userId);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(200).json(group);
};

exports.addAdmin = async (req, res) => {
  const group = await groupService.addAdmin(req.params.id, req.body.userId);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(200).json(group);
};

exports.createEvent = async (req, res) => {
  const event = await groupService.createGroupEvent(req.params.id, req.body);
  if (!event) return res.status(404).json({ error: 'Groupe introuvable' });
  res.status(201).json(event);
};