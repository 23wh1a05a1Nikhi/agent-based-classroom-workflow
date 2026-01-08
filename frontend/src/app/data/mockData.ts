export interface Permission {
  id: string;
  studentName: string;
  studentRollNo: string;
  eventType: 'college' | 'personal';
  eventName: string;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  facultyResponsible: string;
  requestedDate: string;
}

export interface CollegeEvent {
  id: string;
  name: string;
  date: string;
  registrationDeadline: string;
  googleFormLink: string;
  registrationStatus: 'open' | 'closed' | 'submitted';
  description: string;
}

export interface Student {
  rollNo: string;
  name: string;
  department: string;
  year: string;
}

export const mockPermissions: Permission[] = [
  {
    id: '1',
    studentName: 'John Student',
    studentRollNo: '2021CS001',
    eventType: 'college',
    eventName: 'Tech Symposium 2026',
    reason: 'Participating in hackathon event',
    date: '2026-01-15',
    status: 'pending',
    facultyResponsible: 'Dr. Sarah Faculty',
    requestedDate: '2026-01-08'
  },
  {
    id: '2',
    studentName: 'Alice Johnson',
    studentRollNo: '2021CS002',
    eventType: 'personal',
    eventName: 'Medical Appointment',
    reason: 'Scheduled medical checkup',
    date: '2026-01-10',
    status: 'approved',
    facultyResponsible: 'Dr. Sarah Faculty',
    requestedDate: '2026-01-05'
  },
  {
    id: '3',
    studentName: 'Bob Williams',
    studentRollNo: '2021CS003',
    eventType: 'college',
    eventName: 'Annual Sports Day',
    reason: 'Participating in athletics',
    date: '2026-01-20',
    status: 'pending',
    facultyResponsible: 'Dr. John Smith',
    requestedDate: '2026-01-07'
  },
  {
    id: '4',
    studentName: 'Emma Davis',
    studentRollNo: '2021CS004',
    eventType: 'personal',
    eventName: 'Family Function',
    reason: 'Attending family wedding',
    date: '2026-01-12',
    status: 'rejected',
    facultyResponsible: 'Dr. Sarah Faculty',
    requestedDate: '2026-01-06'
  }
];

export const mockCollegeEvents: CollegeEvent[] = [
  {
    id: '1',
    name: 'Tech Symposium 2026',
    date: '2026-01-15',
    registrationDeadline: '2026-01-12',
    googleFormLink: 'https://forms.google.com/example1',
    registrationStatus: 'open',
    description: 'Annual technical symposium featuring hackathons, coding competitions, and tech talks.'
  },
  {
    id: '2',
    name: 'Annual Sports Day',
    date: '2026-01-20',
    registrationDeadline: '2026-01-18',
    googleFormLink: 'https://forms.google.com/example2',
    registrationStatus: 'open',
    description: 'Inter-departmental sports competition with various athletic events.'
  },
  {
    id: '3',
    name: 'Cultural Fest - Vibrance 2026',
    date: '2026-02-01',
    registrationDeadline: '2026-01-28',
    googleFormLink: 'https://forms.google.com/example3',
    registrationStatus: 'submitted',
    description: 'Three-day cultural festival with music, dance, drama, and art competitions.'
  },
  {
    id: '4',
    name: 'Industry Workshop Series',
    date: '2026-01-25',
    registrationDeadline: '2026-01-10',
    googleFormLink: 'https://forms.google.com/example4',
    registrationStatus: 'closed',
    description: 'Professional development workshops by industry experts.'
  }
];

export const mockStudents: Student[] = [
  { rollNo: '2021CS001', name: 'John Student', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS002', name: 'Alice Johnson', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS003', name: 'Bob Williams', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS004', name: 'Emma Davis', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS005', name: 'Michael Brown', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS006', name: 'Sarah Wilson', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS007', name: 'David Martinez', department: 'Computer Science', year: '3rd Year' },
  { rollNo: '2021CS008', name: 'Lisa Anderson', department: 'Computer Science', year: '3rd Year' }
];

export const mockFacultyList = [
  'Dr. Sarah Faculty',
  'Dr. John Smith',
  'Prof. Emily Chen',
  'Dr. Robert Johnson',
  'Prof. Michael Davis'
];
