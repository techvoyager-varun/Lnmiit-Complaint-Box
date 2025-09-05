import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const AdminLoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (username === 'LNMIIT' && password === '123456') {
        login({
          user: {
            id: 'admin',
            name: 'Super Admin',
            email: 'admin@lnmiit.ac.in',
            role: 'admin'
          },
          token: 'admin-token'
        });
        toast({ title: 'Login Successful', description: 'Welcome, Super Admin!' });
        navigate('/admin');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (err: any) {
      toast({ 
        title: 'Login Failed', 
        description: 'Invalid admin credentials',
        variant: 'destructive' 
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter admin username"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Logging in...' : 'Login as Admin'}
      </Button>
    </form>
  );
};
