import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Building, LogOut, GraduationCap } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Your account information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription className="text-base mt-1">
                {user?.role === 'student' ? 'Student' : 'Faculty Member'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            {user?.role === 'student' && user?.rollNo && (
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="font-medium">{user.rollNo}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{user?.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <Button variant="destructive" onClick={handleLogout} className="w-full md:w-auto">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Profile editing is kept minimal in this system to focus on permission management workflows.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
