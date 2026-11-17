const mongoose = require('mongoose');

const purchasedTicketSchema = new mongoose.Schema({
  lastName: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  fullAddress: { type: String, required: true, trim: true },
  purchaseDate: { type: Date, default: Date.now }
});

const ticketTypeSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  limitedQuantity: { type: Number, required: true, min: 1 },
  soldTickets: [purchasedTicketSchema]
}, { timestamps: true });

module.exports = mongoose.model('TicketType', ticketTypeSchema);