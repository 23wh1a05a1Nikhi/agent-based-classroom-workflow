import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Bell, CheckCircle, Clock, XCircle, Calendar, Megaphone } from 'lucide-react';

interface Notification {
  id: string;
  type: 'approval' | 'rejection' | 'reminder' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Permission Approved',
    message: 'Your permission request for Medical Appointment has been approved by Dr. Sarah Faculty.',
    timestamp: '2026-01-07T10:30:00',
    read: false
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Registration Reminder',
    message: 'Tech Symposium 2026 registration closes in 2 days. Don\'t miss out!',
    timestamp: '2026-01-07T09:00:00',
    read: false
  },
  {
    id: '3',
    type: 'announcement',
    title: 'Important Announcement',
    message: 'All students participating in the Annual Sports Day must collect their event passes by January 18th.',
    timestamp: '2026-01-06T15:00:00',
    read: true
  },
  {
    id: '4',
    type: 'rejection',
    title: 'Permission Rejected',
    message: 'Your permission request for Family Function was not approved. Please contact Dr. Sarah Faculty for details.',
    timestamp: '2026-01-06T14:20:00',
    read: true
  }
];

export default function Notifications() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejection':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with your permissions and events</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="text-sm">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={notification.read ? 'bg-gray-50' : 'bg-white border-indigo-200'}
          >
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {getTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <div className="mt-2">
                      <Badge variant="default" className="text-xs">New</Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-500">You're all caught up! New notifications will appear here.</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-indigo-50 border-indigo-200">
        <CardContent className="pt-6">
          <p className="text-sm text-indigo-900">
            <strong>🔔 About Notifications:</strong> This system sends batched notifications to reduce spam.
            You'll receive consolidated updates about permission approvals, rejections, and important announcements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
