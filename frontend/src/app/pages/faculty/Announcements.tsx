import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';

const aiDraftedAnnouncements = [
  "Reminder: Tech Symposium 2026 registration closes in 2 days. Students who have registered, please ensure you submit permission requests to your class teachers.",
  "Important: All students participating in the Annual Sports Day must collect their event passes from the sports office by January 18th.",
  "Update: The Cultural Fest schedule has been finalized. Check your email for detailed timings of events."
];

export default function Announcements() {
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [aiDraft, setAiDraft] = useState('');

  const generateAIDraft = () => {
    const randomDraft = aiDraftedAnnouncements[Math.floor(Math.random() * aiDraftedAnnouncements.length)];
    setAiDraft(randomDraft);
    setContent(randomDraft);
    toast.success('AI draft generated!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Announcement sent successfully!', {
      description: `Sent to ${targetAudience}`
    });
    setContent('');
    setAiDraft('');
    setTargetAudience('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-500 mt-1">Create and send announcements with AI assistance</p>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-purple-900">AI Draft Assistant</CardTitle>
          </div>
          <CardDescription className="text-purple-700">
            Get AI-generated announcement drafts that you can review and edit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateAIDraft} variant="outline" className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Draft
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
          <CardDescription>Compose your announcement message</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content">Announcement Content</Label>
              <Textarea
                id="content"
                placeholder="Type your announcement here or use AI to generate a draft..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                required
              />
              <p className="text-xs text-gray-500">
                You can edit the AI-generated content before sending
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-students">All Students</SelectItem>
                  <SelectItem value="3rd-year-cs">3rd Year CS Students</SelectItem>
                  <SelectItem value="event-participants">Event Participants Only</SelectItem>
                  <SelectItem value="section-a">Section A</SelectItem>
                  <SelectItem value="section-b">Section B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 mb-2">⚠️ Important</h4>
              <p className="text-sm text-amber-800">
                All announcements are drafted by AI but require your approval before being sent.
                Please review the content carefully to ensure accuracy and appropriateness.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Review & Send Announcement
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
