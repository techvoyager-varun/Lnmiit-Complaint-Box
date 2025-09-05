import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Complaint, Building } from '@/types';
import { apiRequest } from '@/lib/api';
import { getFilteredComplaintsByStatus, filterVisibleComplaints } from '@/lib/complaintFilters';
import { useMidnightRefresh } from '@/hooks/useMidnightRefresh';

const WardenDashboard = () => {
  const { user } = useAuth();
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(user?.assignedBuilding || 'BH1');
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Refresh UI at midnight to hide resolved complaints
  useMidnightRefresh();

  const buildings: Building[] = user?.assignedBuilding ? [user.assignedBuilding as Building] : ['BH1', 'BH2', 'BH3', 'BH4', 'GH'];

  useEffect(() => {
    async function load() {
      const data = await apiRequest<any[]>('/complaints');
      const filtered = user?.assignedBuilding ? data.filter((d) => d.building === user.assignedBuilding) : data;
      const mapped: Complaint[] = filtered.map((d: any) => ({
        id: d._id,
        studentId: d.student,
        studentName: d.studentName || 'Student',
        building: d.building,
        roomNumber: d.roomNumber || '',
  problemType: d.category,
        description: d.description,
        status: d.status === 'open' ? 'pending' : d.status === 'in_progress' ? 'assigned' : d.status === 'resolved' ? 'resolved' : 'not-resolved',
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      }));
      setComplaints(filterVisibleComplaints(mapped.filter(c => c.building === selectedBuilding)));
    }
    load();
  }, [selectedBuilding, user?.assignedBuilding]);

  const getComplaintsByStatus = (status: string) => {
    return getFilteredComplaintsByStatus(complaints, status);
  };

  const handleRefresh = async () => {
    const data = await apiRequest<any[]>('/complaints');
    const filtered = user?.assignedBuilding ? data.filter((d) => d.building === user.assignedBuilding) : data;
    const mapped: Complaint[] = filtered.map((d: any) => ({
      id: d._id,
      studentId: d.student,
      studentName: d.studentName || 'Student',
      building: d.building,
      roomNumber: d.roomNumber || '',
      problemType: d.category,
      description: d.description,
      status: d.status === 'open' ? 'pending' : d.status === 'in_progress' ? 'assigned' : d.status === 'resolved' ? 'resolved' : 'not-resolved' as any,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
    setComplaints(filterVisibleComplaints(mapped.filter(c => c.building === selectedBuilding)));
  };

  const handleComplaintUpdate = (updatedComplaint: Complaint) => {
    setComplaints(complaints.map(c => 
      c.id === updatedComplaint.id ? updatedComplaint : c
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Building Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Warden Dashboard</h1>
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </Button>
          </div>
          <div className="flex space-x-2">
            {buildings.map((building) => (
              <Button
                key={building}
                variant={selectedBuilding === building ? "default" : "outline"}
                onClick={() => setSelectedBuilding(building)}
              >
                {building}
              </Button>
            ))}
          </div>
        </div>

        {/* Complaints by Status */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              Pending
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved
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
                  userRole="warden"
                />
              ))}
            </div>
            {getComplaintsByStatus('pending').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending complaints in {selectedBuilding}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('resolved').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onUpdate={handleComplaintUpdate}
                  showActions={true}
                  userRole="warden"
                />
              ))}
            </div>
            {getComplaintsByStatus('resolved').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resolved complaints in {selectedBuilding}</p>
              </div>
            )}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default WardenDashboard;