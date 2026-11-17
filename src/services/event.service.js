const Event = require('../models/Event');

const createEvent = async (data) => {
  if (!data.organizers || data.organizers.length === 0) {
    throw new Error('Un événement doit être géré par au moins 1 organisateur.');
  }
  return await Event.create(data);
};

const searchEvents = async (query) => {
  const filter = {};
  if (query.name) filter.name = { $regex: query.name, $options: 'i' };
  if (query.visibility) filter.visibility = query.visibility;
  if (query.location) filter.location = { $regex: query.location, $options: 'i' };

  return await Event.find(filter)
    .populate('organizers participants', 'firstName lastName email');
};

const getEventById = async (id) => {
  return await Event.findById(id)
    .populate('organizers participants shoppingList.broughtBy carpools.driver', 'firstName lastName email');
};

const updateEvent = async (id, data) => {
  return await Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const deleteEvent = async (id) => {
  return await Event.findByIdAndDelete(id);
};

const addParticipant = async (eventId, userId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    { $addToSet: { participants: userId } },
    { new: true }
  );
};

const addOrganizer = async (eventId, userId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    { $addToSet: { organizers: userId } },
    { new: true }
  );
};

const addShoppingItem = async (eventId, itemData) => {
  const event = await Event.findById(eventId);
  if (!event) return null;

  if (!event.hasShoppingList) {
    throw new Error('La shopping list n’est pas activée sur cet événement.');
  }

  event.shoppingList.push(itemData);
  await event.save();
  return event.shoppingList;
};

const removeShoppingItem = async (eventId, itemId) => {
  const event = await Event.findById(eventId);
  if (!event) return null;

  event.shoppingList.pull({ _id: itemId });
  await event.save();
  return event.shoppingList;
};

const addCarpool = async (eventId, carpoolData) => {
  const event = await Event.findById(eventId);
  if (!event) return null;

  if (!event.hasCarpooling) {
    throw new Error('Le covoiturage n’est pas activé sur cet événement.');
  }

  event.carpools.push(carpoolData);
  await event.save();
  return event.carpools;
};

const removeCarpool = async (eventId, carpoolId) => {
  const event = await Event.findById(eventId);
  if (!event) return null;

  event.carpools.pull({ _id: carpoolId });
  await event.save();
  return event.carpools;
};

module.exports = {
  createEvent,
  searchEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addParticipant,
  addOrganizer,
  addShoppingItem,
  removeShoppingItem,
  addCarpool,
  removeCarpool
};