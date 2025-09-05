const { z } = require('zod');
const { Complaint } = require('../models/Complaint');

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
});

async function createComplaint(req, res) {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }
  const { title, description, category } = parsed.data;
  const doc = await Complaint.create({
    title,
    description,
    category,
    student: req.authUser.userId,
  });
  res.status(201).json(doc);
}

async function listMyComplaints(req, res) {
  const list = await Complaint.find({ student: req.authUser.userId }).sort({ createdAt: -1 });
  res.json(list);
}

async function listAllComplaints(_req, res) {
  const list = await Complaint.find({}).sort({ createdAt: -1 });
  res.json(list);
}

async function updateComplaintStatus(req, res) {
  const { status, assignedTo } = req.body || {};
  const { id } = req.params;
  const doc = await Complaint.findByIdAndUpdate(
    id,
    { $set: { status, assignedTo } },
    { new: true }
  );
  if (!doc) {
    res.status(404).json({ message: 'Complaint not found' });
    return;
  }
  res.json(doc);
}

module.exports = {
  createComplaint,
  listMyComplaints,
  listAllComplaints,
  updateComplaintStatus,
};


