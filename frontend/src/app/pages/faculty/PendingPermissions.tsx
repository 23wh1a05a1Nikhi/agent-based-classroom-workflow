import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { mockPermissions } from '../../data/mockData';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function PendingPermissions() {
  const [permissions, setPermissions] = useState(mockPermissions);
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  const [remarks, setRemarks] = useState('');

  const pendingPermissions = permissions.filter(p => p.status === 'pending');

  const handleApprove = (id: string) => {
    setPermissions(permissions.map(p => 
      p.id === id ? { ...p, status: 'approved' as const } : p
    ));
    toast.success('Permission approved successfully');
  };

  const handleReject = (id: string) => {
    setPermissions(permissions.map(p => 
      p.id === id ? { ...p, status: 'rejected' as const } : p
    ));
    toast.error('Permission rejected');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pending Permissions</h1>
        <p className="text-gray-500 mt-1">Review and approve student permission requests</p>
      </div>

      <div className="grid gap-4">
        {pendingPermissions.map((permission) => (
          <Card key={permission.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{permission.studentName}</h3>
                      <Badge variant="outline">{permission.studentRollNo}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Computer Science Department</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Event:</span>
                      <p className="font-medium">{permission.eventName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <p className="font-medium capitalize">{permission.eventType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium">{new Date(permission.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Requested:</span>
                      <p className="font-medium">{new Date(permission.requestedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {permission.reason && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-500">Reason:</span>
                      <p className="text-sm mt-1">{permission.reason}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedPermission(permission)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Permission Request Details</DialogTitle>
                        <DialogDescription>Full details of the permission request</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Student Information</label>
                          <p className="text-sm text-gray-600">{permission.studentName} ({permission.studentRollNo})</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Event Name</label>
                          <p className="text-sm text-gray-600">{permission.eventName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Reason</label>
                          <p className="text-sm text-gray-600">{permission.reason}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(permission.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>

                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleReject(permission.id)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {pendingPermissions.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
              <p className="text-gray-500">No pending permission requests at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
