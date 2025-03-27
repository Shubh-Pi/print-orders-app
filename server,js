const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (make sure MongoDB is running locally or use your connection string)
mongoose.connect('mongodb://localhost/print_orders', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import models
const Subject = require('./models/subject');
const Output = require('./models/output');
const Order = require('./models/order');

// --- Dummy admin authentication middleware ---
// In a real app, use proper authentication (JWT, sessions, etc.)
const adminAuth = (req, res, next) => {
  // For demo: if request header "x-admin" equals "true", allow; otherwise, reject.
  if (req.headers['x-admin'] === 'true') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// --- API Endpoints ---

// Subjects

// Create new subject (Admin only)
app.post('/api/subjects', adminAuth, async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all subjects with outputs (for client display)
app.get('/api/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find().populate('outputs');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update subject (Admin only)
app.put('/api/subjects/:id', adminAuth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete subject (Admin only)
app.delete('/api/subjects/:id', adminAuth, async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Outputs

// Add new output to a subject (Admin only)
app.post('/api/subjects/:subjectId/outputs', adminAuth, async (req, res) => {
  try {
    const output = new Output(req.body);
    await output.save();
    // Link output to subject
    const subject = await Subject.findById(req.params.subjectId);
    subject.outputs.push(output._id);
    await subject.save();
    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update output details (Admin only)
app.put('/api/outputs/:id', adminAuth, async (req, res) => {
  try {
    const output = await Output.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete output (Admin only)
app.delete('/api/outputs/:id', adminAuth, async (req, res) => {
  try {
    const output = await Output.findByIdAndDelete(req.params.id);
    // Remove output reference from subjects
    await Subject.updateMany({}, { $pull: { outputs: output._id } });
    res.json({ message: 'Output deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Orders

// Client submits a new order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (Admin only)
app.get('/api/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('subject output');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark order as payment received (Admin only)
app.patch('/api/orders/:id/payment', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { paymentReceived: true }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
