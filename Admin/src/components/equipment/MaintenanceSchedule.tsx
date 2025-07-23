import { Card } from '../ui/card';
import { FiAlertTriangle, FiCheckCircle, FiCalendar, FiPlus, FiRefreshCw, FiClock } from 'react-icons/fi';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';

export const MaintenanceSchedule = () => {
  const maintenanceTasks = [
    { 
      id: 1, 
      equipment: 'Treadmill Pro X1', 
      type: 'Lubrication', 
      dueDate: '2023-07-15', 
      status: 'pending',
      lastCompleted: '2023-06-15',
      frequency: 'Monthly',
      priority: 'Medium',
      technician: 'John Smith'
    },
    { 
      id: 2, 
      equipment: 'Elliptical Trainer Elite', 
      type: 'Belt Adjustment', 
      dueDate: '2023-07-01', 
      status: 'overdue',
      lastCompleted: '2023-05-01',
      frequency: 'Bi-Monthly',
      priority: 'High',
      technician: 'Sarah Johnson'
    },
    { 
      id: 3, 
      equipment: 'Weight Bench Deluxe', 
      type: 'Bolt Tightening', 
      dueDate: '2023-08-10', 
      status: 'pending',
      lastCompleted: '2023-06-10',
      frequency: 'Quarterly',
      priority: 'Low',
      technician: 'Mike Brown'
    },
    { 
      id: 4, 
      equipment: 'Leg Press Machine 5000', 
      type: 'Hydraulic Check', 
      dueDate: '2023-06-25', 
      status: 'completed',
      lastCompleted: '2023-06-25',
      frequency: 'Monthly',
      priority: 'Medium',
      technician: 'Alex Davis'
    },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    overdue: 'bg-red-100 text-red-800 border-red-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800'
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Equipment Maintenance</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage all equipment maintenance tasks
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <FiPlus className="mr-2 h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Tasks</div>
          <div className="text-2xl font-bold mt-1">24</div>
          <Progress value={65} className="h-2 mt-2" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Pending</div>
          <div className="text-2xl font-bold mt-1">12</div>
          <Progress value={50} className="h-2 mt-2 bg-yellow-100" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Overdue</div>
          <div className="text-2xl font-bold mt-1">3</div>
          <Progress value={12.5} className="h-2 mt-2 bg-red-100" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Completed</div>
          <div className="text-2xl font-bold mt-1">9</div>
          <Progress value={37.5} className="h-2 mt-2 bg-green-100" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Status: All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Overdue</DropdownMenuItem>
            <DropdownMenuItem>Completed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Priority: All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>High</DropdownMenuItem>
            <DropdownMenuItem>Medium</DropdownMenuItem>
            <DropdownMenuItem>Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Frequency: All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Weekly</DropdownMenuItem>
            <DropdownMenuItem>Monthly</DropdownMenuItem>
            <DropdownMenuItem>Quarterly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="sm">
          <FiClock className="mr-2 h-4 w-4" />
          Due This Week
        </Button>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Maintenance Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Technician
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maintenanceTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{task.equipment}</div>
                  <div className="text-sm text-gray-500">{task.frequency}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{task.type}</div>
                  <Badge variant="outline" className={priorityColors[task.priority as keyof typeof priorityColors]}>
                    {task.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                    {task.status === 'pending' && <FiAlertTriangle className="mr-1 h-3 w-3" />}
                    {task.status === 'overdue' && <FiAlertTriangle className="mr-1 h-3 w-3" />}
                    {task.status === 'completed' && <FiCheckCircle className="mr-1 h-3 w-3" />}
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiCalendar className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-900">{task.dueDate}</div>
                      <div className={`text-xs ${getDaysUntilDue(task.dueDate) < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        {getDaysUntilDue(task.dueDate) < 0 
                          ? `${Math.abs(getDaysUntilDue(task.dueDate))} days overdue` 
                          : `${getDaysUntilDue(task.dueDate)} days remaining`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.technician}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {task.status !== 'completed' && (
                      <Button variant="default" size="sm">
                        Complete
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          More
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
          <span className="font-medium">24</span> tasks
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};