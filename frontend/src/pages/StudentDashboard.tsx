import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { NewComplaintForm } from '@/components/complaints/NewComplaintForm';
import { useAuth } from '@/contexts/AuthContext';
import { listMyComplaintsApi, updateComplaintStatusApi } from '@/lib/api';
import { Complaint } from '@/types';
import { Plus } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await listMyComplaintsApi();
        // Map backend to frontend type loosely for now
        const mapped = data.map((d: any) => ({
          id: d._id,
          studentId: d.student,
          studentName: user.name,
          building: user.building || 'BH1',
          roomNumber: user.roomNumber || '',
          problemType: d.category,
          description: d.description,
          status: d.status === 'open' ? 'pending' : d.status === 'in_progress' ? 'assigned' : d.status === 'resolved' ? 'resolved' : 'not-resolved',
          createdAt: d.createdAt,
          updatedAt: d.updatedAt,
        }));
        setComplaints(mapped);
      } catch (e) {
        // ignore for now
      }
    }
    load();
  }, [user]);

  const handleNewComplaint = (complaint: any) => {
    const mapped: Complaint = {
      id: complaint._id,
      studentId: complaint.student,
      studentName: user?.name || '',
      building: user?.building || 'BH1',
      roomNumber: user?.roomNumber || '',
      problemType: complaint.category,
      description: complaint.description,
      status: complaint.status === 'open' ? 'pending' : complaint.status === 'in_progress' ? 'assigned' : complaint.status === 'resolved' ? 'resolved' : 'not-resolved',
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
    };
    setComplaints([mapped, ...complaints]);
    setShowNewComplaintForm(false);
  };

  const handleUpdate = async (complaint: Complaint, newStatus: 'resolved' | 'not-resolved') => {
    const backendStatus = newStatus === 'resolved' ? 'resolved' : 'rejected';
    await updateComplaintStatusApi(complaint.id, { status: backendStatus });
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaint.id ? { ...c, status: newStatus } : c))
    );
  };

  if (showNewComplaintForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <NewComplaintForm
            onSubmit={handleNewComplaint}
            onCancel={() => setShowNewComplaintForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Complaints</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your submitted complaints
            </p>
          </div>
          <Button onClick={() => setShowNewComplaintForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Complaint
          </Button>
        </div>

        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No complaints submitted yet
            </p>
            <Button onClick={() => setShowNewComplaintForm(true)}>
              Submit Your First Complaint
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                userRole="student"
                showActions
                onUpdate={(c) => {
                  const next = c.status === 'resolved' ? 'resolved' : 'not-resolved';
                  handleUpdate(complaint, next as any);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;