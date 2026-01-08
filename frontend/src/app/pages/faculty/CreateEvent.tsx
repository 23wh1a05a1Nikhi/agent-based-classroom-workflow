import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Calendar, Link as LinkIcon, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [googleFormLink, setGoogleFormLink] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('College event created successfully!', {
      description: 'Students can now register for this event.'
    });
    // Reset form
    setEventName('');
    setEventDate('');
    setRegistrationDeadline('');
    setGoogleFormLink('');
    setDescription('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create College Event</h1>
        <p className="text-gray-500 mt-1">Set up a new college event with registration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Enter the details for the new college event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                <Input
                  id="registrationDeadline"
                  type="date"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleFormLink">Google Form Link</Label>
              <Input
                id="googleFormLink"
                type="url"
                placeholder="https://forms.google.com/..."
                value={googleFormLink}
                onChange={(e) => setGoogleFormLink(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Students will use this form to register</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the event, activities, and any important information..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-medium text-indigo-900 mb-2">📝 Note</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Students can register using the Google Form link</li>
                <li>• You can approve registrations in bulk after the deadline</li>
                <li>• Students must also request permission from their class teacher</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
