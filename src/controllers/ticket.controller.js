const ticketService = require('../services/ticket.service');

exports.create = async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.getAll = async (req, res) => {
  const tickets = await ticketService.searchTickets(req.query);
  res.status(200).json(tickets);
};

exports.getOne = async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Billets introuvable' });
  res.status(200).json(ticket);
};

exports.updateStatus = async (req, res) => {
  const ticket = await ticketService.updateTicketStatus(req.params.id, req.body.status);
  if (!ticket) return res.status(404).json({ error: 'Billet introuvable' });
  res.status(200).json(ticket);
};

exports.remove = async (req, res) => {
  const ticket = await ticketService.deleteTicket(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Billet introuvable' });
  res.status(200).json({ message: 'Billet supprimé' });
};