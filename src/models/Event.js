const mongoose = require('mongoose');

const shoppingItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  arrivalTime: { type: String, required: true },
  broughtBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const carpoolSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departureLocation: { type: String, required: true },
  departureTime: { type: Date, required: true },
  price: { type: Number, required: true, min: 0 },
  availableSeats: { type: Number, required: true, min: 1 },
  maxTimeDeviationMinutes: { type: Number, required: true, min: 0 }
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  coverPhoto: { type: String, default: '' },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hasTicketing: { type: Boolean, default: false },
  hasShoppingList: { type: Boolean, default: false },
  shoppingList: [shoppingItemSchema],
  hasCarpooling: { type: Boolean, default: false },
  carpools: [carpoolSchema]
}, { timestamps: true });

eventSchema.pre('validate', function(next) {
  if (this.shoppingList && this.shoppingList.length > 0) {
    const names = this.shoppingList.map(item => item.name.toLowerCase());
    if (new Set(names).size !== names.length) {
      return next(new Error('Chaque article de la shopping list doit être unique par événement.'));
    }
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);