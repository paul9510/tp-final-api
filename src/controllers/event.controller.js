const eventService = require('../services/event.service');

exports.create = async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(201).json(event);
};

exports.getAll = async (req, res) => {
  const events = await eventService.searchEvents(req.query);
  res.status(200).json(events);
};

exports.getOne = async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json(event);
};

exports.update = async (req, res) => {
  const event = await eventService.updateEvent(req.params.id, req.body);
  if (!event) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json(event);
};

exports.remove = async (req, res) => {
  const event = await eventService.deleteEvent(req.params.id);
  if (!event) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json({ message: 'Événement supprimé' });
};

exports.addParticipant = async (req, res) => {
  const event = await eventService.addParticipant(req.params.id, req.body.userId);
  if (!event) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json(event);
};

exports.addOrganizer = async (req, res) => {
  const event = await eventService.addOrganizer(req.params.id, req.body.userId);
  if (!event) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json(event);
};

exports.addShoppingItem = async (req, res) => {
  const list = await eventService.addShoppingItem(req.params.id, req.body);
  if (!list) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(201).json(list);
};

exports.removeShoppingItem = async (req, res) => {
  const list = await eventService.removeShoppingItem(req.params.id, req.params.itemId);
  if (!list) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json(list);
};

exports.addCarpool = async (req, res) => {
  const carpools = await eventService.addCarpool(req.params.id, req.body);
  if (!carpools) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(201).json(carpools);
};

exports.removeCarpool = async (req, res) => {
  const carpools = await eventService.removeCarpool(req.params.id, req.params.carpoolId);
  if (!carpools) return res.status(404).json({ error: 'Événement introuvable' });
  res.status(200).json(carpools);
};