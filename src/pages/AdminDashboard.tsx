import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getAllEmployees, deleteEmployee, getDepartmentHeadcount, getTotalEmployees } from '@/services/api';
import AnalyticsCards from '@/components/dashboard/AnalyticsCards';
import DepartmentChart from '@/components/dashboard/DepartmentChart';
import EmployeeList from '@/components/dashboard/EmployeeList';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch employees data
  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: getAllEmployees,
  });

  // Fetch analytics data
  const { data: totalEmployees } = useQuery({
    queryKey: ['totalEmployees'],
    queryFn: getTotalEmployees,
  });

  const { data: departmentHeadcount } = useQuery({
    queryKey: ['departmentHeadcount'],
    queryFn: getDepartmentHeadcount,
  });

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEmployeeFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['employees'] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">HR ERP System</h1>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsCards 
          totalEmployees={totalEmployees?.total || 0}
          departmentCount={Object.keys(departmentHeadcount || {}).length}
        />
        
        <div className="space-y-8">
          <DepartmentChart departmentHeadcount={departmentHeadcount} />
          
          <EmployeeList 
            employees={employees}
            onDeleteEmployee={handleDeleteEmployee}
            onEmployeeFormSuccess={handleEmployeeFormSuccess}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;