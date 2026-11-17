const userService = require('../services/user.service');

exports.create = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

exports.getAll = async (req, res) => {
  const users = await userService.searchUsers(req.query);
  res.status(200).json(users);
};

exports.getOne = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.status(200).json(user);
};

exports.update = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.status(200).json(user);
};

exports.remove = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.status(200).json({ message: 'Utilisateur supprimé' });
};