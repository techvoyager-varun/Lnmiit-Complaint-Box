import { Request, Response } from 'express';
import { z } from 'zod';
import { Complaint } from '../models/Complaint.js';

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
});

export async function createComplaint(req: Request, res: Response): Promise<void> {
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
    student: req.authUser!.userId,
  });
  res.status(201).json(doc);
}

export async function listMyComplaints(req: Request, res: Response): Promise<void> {
  const list = await Complaint.find({ student: req.authUser!.userId }).sort({ createdAt: -1 });
  res.json(list);
}

export async function listAllComplaints(_req: Request, res: Response): Promise<void> {
  const list = await Complaint.find({}).sort({ createdAt: -1 });
  res.json(list);
}

export async function updateComplaintStatus(req: Request, res: Response): Promise<void> {
  const { status, assignedTo } = req.body as { status?: string; assignedTo?: string };
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


