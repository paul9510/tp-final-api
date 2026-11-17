const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

const createTicket = async (data) => {
  const event = await Event.findById(data.event);
  if (!event) throw new Error('Événement introuvable');
  if (!event.hasTicketing) {
    throw new Error('La billetterie n’est pas activée sur cet événement.');
  }
  return await Ticket.create(data);
};

const searchTickets = async (query) => {
  const filter = {};
  if (query.event) filter.event = query.event;
  if (query.owner) filter.owner = query.owner;
  if (query.status) filter.status = query.status;

  return await Ticket.find(filter)
    .populate('event', 'name startDate location')
    .populate('owner', 'firstName lastName email');
};

const getTicketById = async (id) => {
  return await Ticket.findById(id)
    .populate('event', 'name startDate location')
    .populate('owner', 'firstName lastName email');
};

const updateTicketStatus = async (id, status) => {
  return await Ticket.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
};

const deleteTicket = async (id) => {
  return await Ticket.findByIdAndDelete(id);
};

module.exports = {
  createTicket,
  searchTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket
};