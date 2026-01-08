import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import RequestPermission from './pages/student/RequestPermission';
import CollegeEvents from './pages/student/CollegeEvents';
import MyPermissions from './pages/student/MyPermissions';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import PendingPermissions from './pages/faculty/PendingPermissions';
import CreateEvent from './pages/faculty/CreateEvent';
import EventApprovals from './pages/faculty/EventApprovals';
import Announcements from './pages/faculty/Announcements';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function Dashboard() {
  const { user } = useAuth();
  return user?.role === 'student' ? <StudentDashboard /> : <FacultyDashboard />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/request-permission" element={<PrivateRoute><RequestPermission /></PrivateRoute>} />
      <Route path="/college-events" element={<PrivateRoute><CollegeEvents /></PrivateRoute>} />
      <Route path="/my-permissions" element={<PrivateRoute><MyPermissions /></PrivateRoute>} />
      <Route path="/pending-permissions" element={<PrivateRoute><PendingPermissions /></PrivateRoute>} />
      <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
      <Route path="/event-approvals" element={<PrivateRoute><EventApprovals /></PrivateRoute>} />
      <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}
