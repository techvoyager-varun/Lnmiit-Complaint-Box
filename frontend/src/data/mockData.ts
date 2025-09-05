import { Complaint, User } from '@/types';

export const mockUsers: User[] = [
  // Students
  {
    id: '1',
    name: 'John Doe',
    email: 'john@college.edu',
    role: 'student',
    rollNumber: 'CS21001',
    roomNumber: '101',
    building: 'BH1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@college.edu',
    role: 'student',
    rollNumber: 'CS21002',
    roomNumber: '205',
    building: 'BH2'
  },
  // Wardens
  {
    id: '3',
    name: 'Dr. Kumar',
    email: 'kumar@college.edu',
    role: 'warden',
    assignedBuilding: 'BH1'
  },
  {
    id: '4',
    name: 'Prof. Sharma',
    email: 'sharma@college.edu',
    role: 'warden',
    assignedBuilding: 'BH2'
  },
  // Maintenance Staff
  {
    id: '5',
    name: 'Ravi Electrician',
    email: 'ravi@college.edu',
    role: 'maintenance',
    profession: 'Electrician'
  },
  {
    id: '6',
    name: 'Suresh AC',
    email: 'suresh@college.edu',
    role: 'maintenance',
    profession: 'AC Duct'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Doe',
    building: 'BH1',
    roomNumber: '101',
    problemType: 'Electricity',
    description: 'Power socket not working in room 101',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Jane Smith',
    building: 'BH2',
    roomNumber: '205',
    problemType: 'AC',
    description: 'AC not cooling properly',
    status: 'assigned',
    assignedTo: '6',
    assignedToName: 'Suresh AC',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    studentId: '1',
    studentName: 'John Doe',
    building: 'BH1',
    roomNumber: '101',
    problemType: 'LAN',
    description: 'Internet connection very slow',
    status: 'resolved',
    assignedTo: '7',
    assignedToName: 'Tech Support',
    createdAt: '2024-01-10T16:45:00Z',
    updatedAt: '2024-01-12T11:30:00Z',
    resolvedAt: '2024-01-12T11:30:00Z',
    resolutionNotes: 'Replaced ethernet cable and reset router'
  }
];