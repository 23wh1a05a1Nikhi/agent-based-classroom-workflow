import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockCollegeEvents } from '../../data/mockData';
import { Calendar, ExternalLink, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function CollegeEvents() {
  const handleRegister = (eventName: string, link: string) => {
    toast.success(`Registration link opened for ${eventName}`);
    window.open(link, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500"><Clock className="w-3 h-3 mr-1" />Open</Badge>;
      case 'submitted':
        return <Badge><CheckCircle2 className="w-3 h-3 mr-1" />Submitted</Badge>;
      case 'closed':
        return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" />Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">College Events</h1>
        <p className="text-gray-500 mt-1">Browse and register for upcoming college events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCollegeEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </div>
                {getStatusBadge(event.registrationStatus)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Event Date:</span>
                  <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">Registration Deadline:</span>
                  <span className="font-medium text-orange-600">{new Date(event.registrationDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                </div>

                {event.registrationStatus === 'open' && (
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleRegister(event.name, event.googleFormLink)}
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}

                {event.registrationStatus === 'submitted' && (
                  <Button className="w-full mt-4" variant="secondary" disabled>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Registration Submitted
                  </Button>
                )}

                {event.registrationStatus === 'closed' && (
                  <Button className="w-full mt-4" variant="outline" disabled>
                    Registration Closed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-indigo-50 border-indigo-200">
        <CardContent className="pt-6">
          <p className="text-sm text-indigo-900">
            <strong>💡 Tip:</strong> Register early to secure your spot! Some events have limited capacity.
            After registering, you'll need to request permission from your class teacher for the event date.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
