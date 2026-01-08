import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, CheckCircle, Clock, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { mockPermissions, mockCollegeEvents } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const myPermissions = mockPermissions.filter(p => p.studentName === user?.name);
  const pendingCount = myPermissions.filter(p => p.status === 'pending').length;
  const approvedCount = myPermissions.filter(p => p.status === 'approved').length;
  const rejectedCount = myPermissions.filter(p => p.status === 'rejected').length;
  const upcomingEvents = mockCollegeEvents.filter(e => e.registrationStatus === 'open').slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your permissions and events</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Permissions granted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upcoming College Events</CardTitle>
              <CardDescription>Register before the deadline</CardDescription>
            </div>
            <Link to="/college-events">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-600">📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span className="text-orange-600">⏰ Register by {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <Link to="/college-events">
                  <Button size="sm">
                    Register
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Permission Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Permission Status</CardTitle>
              <CardDescription>Your recent permission requests</CardDescription>
            </div>
            <Link to="/my-permissions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myPermissions.slice(0, 3).map(permission => (
              <div key={permission.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{permission.eventName}</h4>
                  <p className="text-sm text-gray-500">{new Date(permission.date).toLocaleDateString()}</p>
                </div>
                <Badge
                  variant={
                    permission.status === 'approved' ? 'default' :
                    permission.status === 'pending' ? 'secondary' :
                    'destructive'
                  }
                >
                  {permission.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <CardTitle className="text-yellow-900">Important Notice</CardTitle>
              <CardDescription className="text-yellow-700 mt-1">
                If a permission request is not approved before the deadline, please contact the responsible faculty personally.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
