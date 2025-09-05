import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { loginApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await loginApi(email, password);
      login({ user, token });
      toast({ title: 'Login Successful', description: `Welcome back, ${user.name}!` });
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
      toast({ title: 'Login Failed', description: err.message || 'Invalid credentials', variant: 'destructive' });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign Up
        </Button>
      </div>
    </form>
  );
};