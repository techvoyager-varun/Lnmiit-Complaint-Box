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
    building: req.body.building,
    roomNumber: req.body.roomNumber,
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
  const doc = await Complaint.findById(id);
  if (!doc) {
    res.status(404).json({ message: 'Complaint not found' });
    return;
  }

  // permissions:
  // - student can only update own complaint to resolved or rejected (not-resolved)
  // - warden/maintenance can assign and set status in_progress/resolved/rejected
  const role = req.authUser.role;
  const isOwner = String(doc.student) === String(req.authUser.userId);

  if (role === 'student') {
    if (!isOwner) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    if (!['resolved', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status for student' });
      return;
    }
    doc.status = status;
  } else if (role === 'warden' || role === 'maintenance') {
    if (assignedTo) doc.assignedTo = assignedTo;
    if (status) doc.status = status;
  } else {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await doc.save();
  res.json(doc);
}

module.exports = {
  createComplaint,
  listMyComplaints,
  listAllComplaints,
  updateComplaintStatus,
};


