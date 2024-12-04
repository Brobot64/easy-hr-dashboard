import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createEmployee, updateEmployee } from "@/services/api";

interface EmployeeFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const EmployeeForm = ({ initialData, onSuccess, onCancel }: EmployeeFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      department: "",
      role: "employee",
      joiningDate: "",
      salary: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (initialData) {
        const employeeResponse = await fetch(`http://localhost:5000/api/employees/${initialData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            department: data.department,
            role: data.role,
            joiningDate: data.joiningDate,
            salary: data.salary,
          }),
        });

        if (!employeeResponse.ok) {
          throw new Error("Failed to update employee");
        }

        toast({
          title: "Success",
          description: "Employee updated successfully",
        });
        onSuccess();
      } else {
        const userResponse = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            department: data.department,
          }),
        });

        if (!userResponse.ok) {
          throw new Error("Failed to create user");
        }

        const employeeResponse = await fetch("http://localhost:5000/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            department: data.department,
            role: data.role,
            joiningDate: new Date().toISOString().split("T")[0],
            salary: data.salary,
          }),
        });

        if (!employeeResponse.ok) {
          throw new Error("Failed to create employee");
        }

        toast({
          title: "Success",
          description: "Employee created successfully",
        });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Engineering", "Marketing", "HR", "Sales", "Finance"].map(
                    (dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="joiningDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joining Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;