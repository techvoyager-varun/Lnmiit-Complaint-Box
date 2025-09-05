import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole, Building, MaintenanceProfession } from '@/types';
import { signupApi } from '@/lib/api';

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as UserRole,
    rollNumber: '',
    roomNumber: '',
    building: '' as Building,
    assignedBuilding: '' as Building,
    profession: '' as MaintenanceProfession,
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await signupApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        building: formData.role === 'student' ? formData.building : undefined,
        roomNumber: formData.role === 'student' ? formData.roomNumber : undefined,
        assignedBuilding: formData.role === 'warden' ? formData.assignedBuilding : undefined,
        profession: formData.role === 'maintenance' ? formData.profession : undefined,
      });
      login({ user, token });
      toast({ title: 'Account Created', description: 'Your account has been created successfully!' });
      switch (user.role as any) {
        case 'student':
          navigate('/student');
          break;
        case 'warden':
          navigate('/warden');
          break;
        case 'maintenance':
          navigate('/maintenance');
          break;
        default:
          navigate('/');
      }
    } catch (err: any) {
      toast({ title: 'Signup Failed', description: err.message || 'Try again', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
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
          placeholder="example: 20ucs000@lnmiit.ac.in"
          required
        />
        <p className="text-sm text-muted-foreground">
          Students must use their LNMIIT email (e.g., 20ucs000@lnmiit.ac.in)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a password"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Note: Warden and Maintenance staff accounts can only be created by the admin.
        </p>
      </div>

      {/* Student specific fields */}
      {formData.role === 'student' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              placeholder="Enter your roll number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              placeholder="Enter your room number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="building">Building</Label>
            <Select onValueChange={(value: Building) => setFormData({ ...formData, building: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your building" />
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
        </>
      )}

      {/* Warden specific fields */}
      {formData.role === 'warden' && (
        <div className="space-y-2">
          <Label htmlFor="assignedBuilding">Assigned Building</Label>
          <Select onValueChange={(value: Building) => setFormData({ ...formData, assignedBuilding: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select assigned building" />
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

      {/* Maintenance specific fields */}
      {formData.role === 'maintenance' && (
        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Select onValueChange={(value: MaintenanceProfession) => setFormData({ ...formData, profession: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your profession" />
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign In
        </Button>
      </div>
    </form>
  );
};