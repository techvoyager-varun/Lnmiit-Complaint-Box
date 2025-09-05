import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { signupApi } from '@/lib/api';
import { MaintenanceProfession, Building } from '@/types';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'warden' | 'maintenance',
    building: '' as Building,
    profession: '' as MaintenanceProfession,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'warden' ? { assignedBuilding: formData.building } : {}),
        ...(formData.role === 'maintenance' ? { profession: formData.profession } : {}),
      });
      toast({
        title: 'Staff Account Created',
        description: `Successfully created account for ${formData.role}`,
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '' as 'warden' | 'maintenance',
        building: '' as Building,
        profession: '' as MaintenanceProfession,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Staff Account</CardTitle>
            <CardDescription>Create accounts for wardens and maintenance staff</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  onValueChange={(value: 'warden' | 'maintenance') => 
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warden">Warden</SelectItem>
                    <SelectItem value="maintenance">Maintenance Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'warden' && (
                <div className="space-y-2">
                  <Label htmlFor="building">Assigned Building</Label>
                  <Select 
                    onValueChange={(value: Building) => 
                      setFormData({ ...formData, building: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select building" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BH1">BH1</SelectItem>
                      <SelectItem value="BH2">BH2</SelectItem>
                      <SelectItem value="BH3">BH3</SelectItem>
                      <SelectItem value="BH4">BH4</SelectItem>
                      <SelectItem value="GH">GH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.role === 'maintenance' && (
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Select 
                    onValueChange={(value: MaintenanceProfession) => 
                      setFormData({ ...formData, profession: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electrician">Electrician</SelectItem>
                      <SelectItem value="AC Duct">AC Duct</SelectItem>
                      <SelectItem value="LAN">LAN</SelectItem>
                      <SelectItem value="Carpenter">Carpenter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
