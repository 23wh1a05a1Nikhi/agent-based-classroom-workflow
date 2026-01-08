import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { mockPermissions } from '../../data/mockData';
import { CheckCircle, Clock, XCircle, FileText, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FacultyDashboard() {
  const pendingPermissions = mockPermissions.filter(p => p.status === 'pending');
  const todayApprovals = mockPermissions.filter(p => 
    p.status === 'approved' && new Date(p.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage permissions and events efficiently</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingPermissions.length}</div>
            <p className="text-xs text-gray-500 mt-1">Requires your attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Approvals</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayApprovals.length}</div>
            <p className="text-xs text-gray-500 mt-1">Approved today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPermissions.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Students</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">In your class</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/pending-permissions">
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <Clock className="w-6 h-6" />
                <span>Review Pending</span>
              </Button>
            </Link>
            <Link to="/create-event">
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <Calendar className="w-6 h-6" />
                <span>Create Event</span>
              </Button>
            </Link>
            <Link to="/event-approvals">
              <Button className="w-full h-20 flex-col gap-2" variant="outline">
                <Users className="w-6 h-6" />
                <span>Bulk Approvals</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Pending Permissions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pending Permission Requests</CardTitle>
              <CardDescription>Requires your review</CardDescription>
            </div>
            <Link to="/pending-permissions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingPermissions.slice(0, 5).map((permission) => (
              <div key={permission.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{permission.studentName}</h4>
                    <Badge variant="outline" className="text-xs">{permission.studentRollNo}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{permission.eventName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(permission.date).toLocaleDateString()} • {permission.eventType}
                  </p>
                </div>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              </div>
            ))}

            {pendingPermissions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>All caught up! No pending requests.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Agent Summary */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            Agent Intelligence Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <strong>Today's Insights:</strong> You have {pendingPermissions.length} pending requests. 
              Most are for college events scheduled in the next 2 weeks.
            </p>
            <p className="text-gray-700">
              <strong>Recommendation:</strong> Consider reviewing and approving Tech Symposium requests first as the event date is approaching.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
