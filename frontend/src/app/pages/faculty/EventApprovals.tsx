import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { mockCollegeEvents, mockStudents } from '../../data/mockData';
import { CheckCircle, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function EventApprovals() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [students, setStudents] = useState(mockStudents);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(students.map(s => s.rollNo));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (rollNo: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, rollNo]);
    } else {
      setSelectedStudents(selectedStudents.filter(r => r !== rollNo));
    }
  };

  const handleApproveAll = () => {
    toast.success(`Approved ${selectedStudents.length} students for the event`);
    setSelectedStudents([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Event Registrations & Approvals</h1>
        <p className="text-gray-500 mt-1">Bulk approve student registrations for college events</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Event</CardTitle>
          <CardDescription>Choose an event to view and approve registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger>
              <SelectValue placeholder="Select a college event" />
            </SelectTrigger>
            <SelectContent>
              {mockCollegeEvents.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name} - {new Date(event.date).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedEvent && (
        <>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Registered Students</CardTitle>
                  <CardDescription>Students who submitted registration forms</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{students.length} students registered</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedStudents.length === students.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.rollNo}>
                        <TableCell>
                          <Checkbox
                            checked={selectedStudents.includes(student.rollNo)}
                            onCheckedChange={(checked) => handleSelectStudent(student.rollNo, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Click to approve all selected students for this event
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={selectedStudents.length === 0}
                  onClick={handleApproveAll}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Selected ({selectedStudents.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedEvent && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Event Selected</h3>
            <p className="text-gray-500">Select an event above to view and approve student registrations</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
