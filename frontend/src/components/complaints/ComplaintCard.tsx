import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Complaint } from '@/types';
import { Calendar, MapPin, User, Wrench } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  onUpdate?: (complaint: Complaint) => void;
  showActions?: boolean;
  userRole?: string;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ 
  complaint, 
  onUpdate, 
  showActions = false,
  userRole 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-status-pending text-foreground';
      case 'assigned': return 'bg-status-assigned text-primary-foreground';
      case 'resolved': return 'bg-status-resolved text-primary-foreground';
      case 'not-resolved': return 'bg-status-not-resolved text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">
            {complaint.problemType} Issue
          </CardTitle>
          <Badge className={getStatusColor(complaint.status)}>
            {complaint.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{complaint.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{complaint.studentName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{complaint.building} - Room {complaint.roomNumber}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(complaint.createdAt)}</span>
          </div>
          
          {complaint.assignedToName && (
            <div className="flex items-center space-x-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span>{complaint.assignedToName}</span>
            </div>
          )}
        </div>

        {complaint.resolutionNotes && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium text-muted-foreground mb-1">Resolution Notes:</p>
            <p className="text-sm">{complaint.resolutionNotes}</p>
          </div>
        )}

        {showActions && userRole && (
          <div className="flex space-x-2 pt-2">
            {/* Removed Assign button for warden */}

            {userRole === 'warden' && complaint.status === 'assigned' && (
              <>
                <Button
                  size="sm"
                  onClick={() => onUpdate?.({ ...complaint, status: 'resolved' })}
                >
                  Mark Resolved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdate?.({ ...complaint, status: 'not-resolved' })}
                >
                  Not Resolved
                </Button>
              </>
            )}
            
            {userRole === 'maintenance' && complaint.status === 'assigned' && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => onUpdate?.({ ...complaint, status: 'resolved' })}
                >
                  Mark Resolved
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onUpdate?.({ ...complaint, status: 'not-resolved' })}
                >
                  Cannot Resolve
                </Button>
              </>
            )}

            {userRole === 'student' && (complaint.status === 'pending' || complaint.status === 'assigned') && (
              <>
                <Button
                  size="sm"
                  onClick={() => onUpdate?.({ ...complaint, status: 'resolved' })}
                >
                  ✓ Resolved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdate?.({ ...complaint, status: 'not-resolved' })}
                >
                  ✗ Not Resolved
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};