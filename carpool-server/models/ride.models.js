const mongoose = require('mongoose');
const { Schema } = mongoose;

const rideSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Car owner reference
  passengers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of passenger references
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  date: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  pricePerSeat: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
},{timestamps: true});

module.exports = mongoose.model('Ride', rideSchema);
