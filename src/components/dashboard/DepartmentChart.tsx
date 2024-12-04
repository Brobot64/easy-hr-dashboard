import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DepartmentChartProps {
  departmentHeadcount: any;
}

const DepartmentChart = ({ departmentHeadcount }: DepartmentChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="font-semibold">{`Department: ${label}`}</p>
          <p>{`Employees: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Department Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentHeadcount}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="department" 
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#8B5CF6" name="Employees" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DepartmentChart;