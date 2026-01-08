import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { toast } from 'sonner';
import { mockFacultyList } from '../../data/mockData';
import { Send, Calendar } from 'lucide-react';

export default function RequestPermission() {
  const [eventType, setEventType] = useState<'college' | 'personal'>('college');
  const [eventName, setEventName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [faculty, setFaculty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Permission request submitted successfully!', {
      description: 'You will be notified once it is reviewed.'
    });
    // Reset form
    setEventName('');
    setReason('');
    setDate('');
    setFaculty('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Request Permission</h1>
        <p className="text-gray-500 mt-1">Submit a permission request for college or personal events</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Request Form</CardTitle>
          <CardDescription>Fill in the details for your permission request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>Event Type</Label>
              <RadioGroup value={eventType} onValueChange={(v) => setEventType(v as 'college' | 'personal')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="college" id="college" />
                  <Label htmlFor="college" className="font-normal cursor-pointer">College Event</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="font-normal cursor-pointer">Personal Event</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                placeholder="e.g., Tech Symposium 2026"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {eventType === 'personal' && (
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain the reason for your permission request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="faculty">Responsible Faculty (Optional)</Label>
              <Select value={faculty} onValueChange={setFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty member" />
                </SelectTrigger>
                <SelectContent>
                  {mockFacultyList.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Expected Response Time:</strong> You should receive a response within 2-3 working days.
                If urgent, please contact the faculty directly.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Submit Permission Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
