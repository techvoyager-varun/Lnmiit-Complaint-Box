import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'rejected';

export interface ComplaintDocument extends Document {
  title: string;
  description: string;
  category: string;
  student: Types.ObjectId; // ref User
  assignedTo?: Types.ObjectId; // ref User (warden/maintenance)
  status: ComplaintStatus;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<ComplaintDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'rejected'],
      default: 'open',
      index: true,
    },
  },
  { timestamps: true }
);

export const Complaint: Model<ComplaintDocument> =
  mongoose.models.Complaint || mongoose.model<ComplaintDocument>('Complaint', complaintSchema);


