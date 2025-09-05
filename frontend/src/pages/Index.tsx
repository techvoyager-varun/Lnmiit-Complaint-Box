import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Wrench } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Campus Help Desk</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Streamlined complaint management for college hostels and buildings
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/signup')}>
              Create Account
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>For Students</CardTitle>
              <CardDescription>
                Submit complaints and track their status in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Easy complaint submission</li>
                <li>• Real-time status tracking</li>
                <li>• Photo/video evidence upload</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Building className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>For Wardens</CardTitle>
              <CardDescription>
                Manage complaints for your assigned buildings efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Building-specific dashboards</li>
                <li>• Complaint assignment</li>
                <li>• Status monitoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Wrench className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>For Maintenance</CardTitle>
              <CardDescription>
                Receive and update complaint resolutions by expertise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Profession-based filtering</li>
                <li>• Resolution tracking</li>
                <li>• Communication tools</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Buildings Covered</h2>
          <div className="flex justify-center space-x-4 flex-wrap">
            {['BH1', 'BH2', 'BH3', 'BH4', 'GH'].map((building) => (
              <div key={building} className="bg-card p-4 rounded-lg border">
                <span className="font-semibold text-lg">{building}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
