import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Building, Hash, DoorOpen, Wrench } from 'lucide-react';


const Profile = () => {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, ...formData };
      login(updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              &#8592; Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {user.role}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{user.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Role-specific information */}
              {user.role === 'student' && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Student Information</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Roll Number:</span>
                    <span>{user.rollNumber}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DoorOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Room:</span>
                    <span>{user.roomNumber}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Building:</span>
                    <Badge variant="outline">{user.building}</Badge>
                  </div>
                </div>
              )}

              {user.role === 'warden' && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Warden Information</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Assigned Building:</span>
                    <Badge variant="outline">{user.assignedBuilding}</Badge>
                  </div>
                </div>
              )}

              {user.role === 'maintenance' && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Maintenance Information</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Profession:</span>
                    <Badge variant="outline">{user.profession}</Badge>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex space-x-4 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;