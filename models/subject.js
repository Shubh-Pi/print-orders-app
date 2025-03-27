const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  outputs: [{ type: Schema.Types.ObjectId, ref: 'Output' }]
});

module.exports = mongoose.model('Subject', SubjectSchema);
