export type UserRole = 'student' | 'warden' | 'maintenance';

export type Building = 'BH1' | 'BH2' | 'BH3' | 'BH4' | 'GH';

export type ComplaintStatus = 'pending' | 'assigned' | 'resolved' | 'not-resolved';

export type ProblemType = 'Electricity' | 'AC' | 'LAN' | 'Furniture' | 'Plumbing';

export type MaintenanceProfession = 'Electrician' | 'AC Duct' | 'LAN' | 'Carpenter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Student specific
  rollNumber?: string;
  roomNumber?: string;
  building?: Building;
  // Warden specific
  assignedBuilding?: Building;
  // Maintenance specific
  profession?: MaintenanceProfession;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  building: Building;
  roomNumber: string;
  problemType: ProblemType;
  description: string;
  status: ComplaintStatus;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  images?: string[];
  remarks?: string;
}