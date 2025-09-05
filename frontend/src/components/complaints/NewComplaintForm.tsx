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
      const created = await createComplaintApi({
        title: formData.problemType,
        description: formData.description,
        category: formData.problemType,
        ...(user?.building ? { building: user.building } : {}),
        ...(user?.roomNumber ? { roomNumber: user.roomNumber } : {}),
      } as any);
      toast({ title: 'Complaint Submitted', description: 'Your complaint has been submitted successfully.' });
      onSubmit(created);
    } catch (err: any) {
      // Custom error for complaint limit
      let message = err?.message || 'Try again';
      try {
        // Try to parse backend error JSON if possible
        const parsed = JSON.parse(message);
        if (parsed && parsed.message) message = parsed.message;
      } catch {}
      if (message.includes('only submit 2 complaints')) {
        toast({
          title: 'Complaint Limit Reached',
          description: 'You can only submit 2 complaints per 24 hours. Please try again after 24 hours from your first complaint.',
          variant: 'destructive',
          duration: 3000,
        });
      } else {
        toast({ title: 'Submission Failed', description: message, variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="relative z-10 w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <CardHeader className="relative z-10 space-y-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Submit New Complaint
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Fill in the details below to submit a new maintenance request
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="problemType" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Issue Type
              </Label>
              <Select onValueChange={(value: ProblemType) => setFormData({ ...formData, problemType: value })}>
                <SelectTrigger className="h-14 rounded-2xl border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue placeholder="Choose the type of issue you're experiencing" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
                  <SelectItem value="Electrician" className="rounded-xl m-1 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Electrical Issues</div>
                        <div className="text-sm text-gray-500">Power, lighting, outlets</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="AC Duct" className="rounded-xl m-1 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">AC & Ventilation</div>
                        <div className="text-sm text-gray-500">Air conditioning, ducts</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="LAN" className="rounded-xl m-1 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Network & LAN</div>
                        <div className="text-sm text-gray-500">Internet, connectivity</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Carpenter" className="rounded-xl m-1 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Carpentry Work</div>
                        <div className="text-sm text-gray-500">Furniture, doors, repairs</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </Label>
              <div className="relative">
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please provide as much detail as possible about the issue you're experiencing..."
                  className="min-h-[140px] rounded-2xl border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  required
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  Be specific to help us resolve faster
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="images" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Supporting Images
                <span className="text-sm font-normal text-gray-500">(Optional)</span>
              </Label>
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-white/50 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group">
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFormData({ ...formData, images: files });
                    }}
                  />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">Upload Images</p>
                    <p className="text-gray-500">
                      Click to browse or drag and drop images here
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Add photos to help us better understand and address the issue
                    </p>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ {formData.images.length} file(s) selected
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={loading} 
                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Complaint
                  </span>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel} 
                className="flex-1 h-14 rounded-2xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold text-lg bg-white/70 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};