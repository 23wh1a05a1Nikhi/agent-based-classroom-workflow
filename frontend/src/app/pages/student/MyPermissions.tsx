import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { mockPermissions } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';

export default function MyPermissions() {
  const { user } = useAuth();
  const myPermissions = mockPermissions.filter(p => p.studentName === user?.name);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Permissions</h1>
        <p className="text-gray-500 mt-1">Track all your permission requests and their status</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          If a permission is not approved before the deadline, please contact the responsible faculty personally.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Permission Requests</CardTitle>
          <CardDescription>Complete history of your permission requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">{permission.eventName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {permission.eventType}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(permission.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm text-gray-600">{permission.facultyResponsible}</TableCell>
                    <TableCell className="text-sm text-gray-500">{new Date(permission.requestedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(permission.status)}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {myPermissions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No permission requests yet.</p>
              <p className="text-sm text-gray-400 mt-1">Submit your first request to see it here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
