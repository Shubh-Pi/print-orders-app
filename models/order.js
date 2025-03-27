const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  clientName: { type: String, required: true },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  output: { type: Schema.Types.ObjectId, ref: 'Output', required: true },
  quantity: { type: Number, required: true },
  rubric: { type: String }, // optional field
  totalPayment: { type: Number, required: true },
  paymentReceived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
