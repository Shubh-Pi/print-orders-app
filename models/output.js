const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutputSchema = new Schema({
  label: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model('Output', OutputSchema);
