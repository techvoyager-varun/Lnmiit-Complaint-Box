import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Complaint } from '@/types';
import { apiRequest } from '@/lib/api';

const MaintenanceDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState('BH1');

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

  // Map profession to problem type
  const professionToProblemType: Record<string, string> = {
    Electrician: 'Electricity',
    'AC Duct': 'AC',
    LAN: 'LAN',
    Carpenter: 'Furniture',
  };

  const getComplaintsByStatus = (status: string) => {
    let filtered = complaints.filter(c => c.status === status);
    if (user?.role === 'maintenance' && user.profession && professionToProblemType[user.profession]) {
      filtered = filtered.filter(c => c.problemType === professionToProblemType[user.profession]);
    }
    return filtered;
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

        {/* Building Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {['BH1', 'BH2', 'BH3', 'BH4', 'GH'].map((building) => (
            <Button
              key={building}
              variant={selectedBuilding === building ? 'default' : 'outline'}
              onClick={() => setSelectedBuilding(building)}
            >
              {building}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="pending" className="relative">
              Pending Complaints
              <Badge className="ml-2">{
                getComplaintsByStatus('pending').filter(c => c.building === selectedBuilding).length
              }</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('pending')
                .filter((complaint) => complaint.building === selectedBuilding)
                .map((complaint) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onUpdate={handleComplaintUpdate}
                    showActions={true}
                    userRole="maintenance"
                  />
                ))}
            </div>
            {getComplaintsByStatus('pending').filter(c => c.building === selectedBuilding).length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending complaints for {selectedBuilding}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;