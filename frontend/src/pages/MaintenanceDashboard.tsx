import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockComplaints } from '@/data/mockData';
import { Complaint } from '@/types';

const MaintenanceDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    // Filter complaints by profession (mock - would match by assigned maintenance staff)
    const relevantComplaints = mockComplaints.filter(c => {
      if (!user?.profession) return false;
      
      // Map professions to problem types
      const professionMapping: Record<string, string[]> = {
        'Electrician': ['Electricity'],
        'AC Duct': ['AC'],
        'LAN': ['LAN'],
        'Carpenter': ['Furniture']
      };
      
      return professionMapping[user.profession]?.includes(c.problemType);
    });
    
    setComplaints(relevantComplaints);
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

        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assigned" className="relative">
              Assigned to Me
              <Badge className="ml-2">{getComplaintsByStatus('assigned').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="relative">
              Resolved
              <Badge className="ml-2">{getComplaintsByStatus('resolved').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="not-resolved" className="relative">
              Cannot Resolve
              <Badge className="ml-2">{getComplaintsByStatus('not-resolved').length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('assigned').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onUpdate={handleComplaintUpdate}
                  showActions={true}
                  userRole="maintenance"
                />
              ))}
            </div>
            {getComplaintsByStatus('assigned').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No complaints assigned to you</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('resolved').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  userRole="maintenance"
                />
              ))}
            </div>
            {getComplaintsByStatus('resolved').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resolved complaints yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="not-resolved" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getComplaintsByStatus('not-resolved').map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  userRole="maintenance"
                />
              ))}
            </div>
            {getComplaintsByStatus('not-resolved').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No unresolved complaints</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;