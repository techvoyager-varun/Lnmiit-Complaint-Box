import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockComplaints } from '@/data/mockData';
import { Complaint, Building } from '@/types';

const WardenDashboard = () => {
  const { user } = useAuth();
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(user?.assignedBuilding || 'BH1');
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const buildings: Building[] = ['BH1', 'BH2', 'BH3', 'BH4', 'GH'];

  useEffect(() => {
    // Filter complaints for selected building and exclude resolved ones for main view
    const buildingComplaints = mockComplaints.filter(c => 
      c.building === selectedBuilding && c.status !== 'resolved'
    );
    setComplaints(buildingComplaints);
  }, [selectedBuilding]);

  const getComplaintsByStatus = (status: string) => {
    return complaints.filter(c => c.status === status);
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
          <h1 className="text-3xl font-bold mb-4">Warden Dashboard</h1>
          <div className="flex space-x-2">
            {buildings.map((building) => (
              <Button
                key={building}
                variant={selectedBuilding === building ? "default" : "outline"}
                onClick={() => setSelectedBuilding(building)}
                className="relative"
              >
                {building}
                {selectedBuilding === building && (
                  <Badge className="ml-2 bg-primary-foreground text-primary">
                    {complaints.length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Complaints by Status */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="relative">
              Pending
              <Badge className="ml-2">{getComplaintsByStatus('pending').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="assigned" className="relative">
              Assigned
              <Badge className="ml-2">{getComplaintsByStatus('assigned').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="not-resolved" className="relative">
              Not Resolved
              <Badge className="ml-2">{getComplaintsByStatus('not-resolved').length}</Badge>
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

          <TabsContent value="assigned" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('assigned').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  userRole="warden"
                />
              ))}
            </div>
            {getComplaintsByStatus('assigned').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No assigned complaints in {selectedBuilding}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="not-resolved" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('not-resolved').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onUpdate={handleComplaintUpdate}
                  showActions={true}
                  userRole="warden"
                />
              ))}
            </div>
            {getComplaintsByStatus('not-resolved').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No unresolved complaints in {selectedBuilding}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WardenDashboard;