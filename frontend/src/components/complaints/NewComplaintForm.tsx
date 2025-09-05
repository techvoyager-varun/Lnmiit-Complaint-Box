import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ProblemType } from '@/types';
import { createComplaintApi } from '@/lib/api';

interface NewComplaintFormProps {
  onSubmit: (complaint: any) => void;
  onCancel: () => void;
}

export const NewComplaintForm: React.FC<NewComplaintFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    problemType: '' as ProblemType,
    description: '',
    images: [] as File[]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createComplaintApi({
        title: formData.problemType,
        description: formData.description,
        category: formData.problemType,
      });
      toast({ title: 'Complaint Submitted', description: 'Your complaint has been submitted successfully.' });
      onSubmit({});
    } catch (err: any) {
      toast({ title: 'Submission Failed', description: err.message || 'Try again', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit New Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="problemType">Problem Type</Label>
            <Select onValueChange={(value: ProblemType) => setFormData({ ...formData, problemType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select problem type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electricity">Electricity</SelectItem>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="LAN">LAN</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the problem in detail..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images (Optional)</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setFormData({ ...formData, images: files });
              }}
            />
            <p className="text-sm text-muted-foreground">
              Upload photos to help us understand the problem better
            </p>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};