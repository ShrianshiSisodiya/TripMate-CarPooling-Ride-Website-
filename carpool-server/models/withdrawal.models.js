
const mongoose = require("mongoose");
const WithdrawalSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
  },{timestamps: true});
  
  module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
  