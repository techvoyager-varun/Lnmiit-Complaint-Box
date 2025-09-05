import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Complaint } from '@/types';
import { apiRequest } from '@/lib/api';

const MaintenanceDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    async function load() {
      const data = await apiRequest<any[]>('/complaints');
      const mapped: Complaint[] = data.map((d: any) => ({
        id: d._id,
        studentId: d.student,
        studentName: d.studentName || 'Student',
        building: d.building || 'BH1',
        roomNumber: d.roomNumber || '',
        problemType: d.category,
        description: d.description,
        status: d.status === 'open' ? 'pending' : d.status === 'in_progress' ? 'assigned' : d.status === 'resolved' ? 'resolved' : 'not-resolved',
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      }));
      setComplaints(mapped);
    }
    load();
  }, [user]);

  const getComplaintsByStatus = (status: string) => {
    return complaints.filter(c => c.status === status);
  };

  const handleComplaintUpdate = (updatedComplaint: Complaint) => {
    const updated = {
      ...updatedComplaint,
      updatedAt: new Date().toISOString(),
      ...(updatedComplaint.status === 'resolved' && {
        resolvedAt: new Date().toISOString(),
        resolutionNotes: 'Issue resolved by maintenance team'
      })
    };
    
    setComplaints(complaints.map(c => 
      c.id === updated.id ? updated : c
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage complaints for {user?.profession} services
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="pending" className="relative">
              Pending Complaints
              <Badge className="ml-2">{getComplaintsByStatus('pending').length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('pending').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onUpdate={handleComplaintUpdate}
                  showActions={true}
                  userRole="maintenance"
                />
              ))}
            </div>
            {getComplaintsByStatus('pending').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending complaints</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;