import { format } from 'date-fns';
import { MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EmployeeForm from '@/components/EmployeeForm';
import { UserPlus } from 'lucide-react';

interface EmployeeListProps {
  employees: any[];
  onDeleteEmployee: (id: string) => void;
  onEmployeeFormSuccess: () => void;
}

const EmployeeList = ({ employees, onDeleteEmployee, onEmployeeFormSuccess }: EmployeeListProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employee List</CardTitle>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              onSuccess={() => {
                onEmployeeFormSuccess();
                setIsAddModalOpen(false);
              }}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Department</th>
                <th className="text-left py-2">Role</th>
                <th className="text-left py-2">Salary</th>
                <th className="text-left py-2">Joining Date</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee: any) => (
                <tr key={employee._id} className="border-b">
                  <td className="py-2">{employee.name}</td>
                  <td className="py-2">{employee.email}</td>
                  <td className="py-2">{employee.department}</td>
                  <td className="py-2">{employee.role}</td>
                  <td className="py-2">${employee.salary.toLocaleString()}</td>
                  <td className="py-2">{format(new Date(employee.joiningDate), 'MMM dd, yyyy')}</td>
                  <td className="py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteEmployee(employee._id)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <EmployeeForm
            initialData={selectedEmployee}
            onSuccess={() => {
              onEmployeeFormSuccess();
              setIsEditModalOpen(false);
              setSelectedEmployee(null);
            }}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedEmployee(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EmployeeList;