import { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiAlertTriangle, FiTool, FiPlus, FiCheckCircle, FiChevronDown, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { ExportEquipment } from './ExportEquipment';

type Equipment = {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  purchaseDate: string;
  status: 'operational' | 'maintenance' | 'out of service';
  lastMaintenance: string;
  nextMaintenance: string;
  usageHours: number;
  location: string;
};

export const EquipmentTable = () => {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Treadmill Pro X1',
      type: 'Cardio',
      serialNumber: 'TRD-2022-001',
      purchaseDate: '2022-01-15',
      status: 'operational',
      lastMaintenance: '2023-06-01',
      nextMaintenance: '2023-09-01',
      usageHours: 450,
      location: 'Main Gym Floor'
    },
    {
      id: '2',
      name: 'Elliptical Trainer Elite',
      type: 'Cardio',
      serialNumber: 'ELP-2022-002',
      purchaseDate: '2022-03-10',
      status: 'maintenance',
      lastMaintenance: '2023-05-15',
      nextMaintenance: '2023-08-15',
      usageHours: 620,
      location: 'Cardio Zone'
    },
    {
      id: '3',
      name: 'Weight Bench Deluxe',
      type: 'Strength',
      serialNumber: 'WB-2021-005',
      purchaseDate: '2021-11-05',
      status: 'operational',
      lastMaintenance: '2023-06-10',
      nextMaintenance: '2023-09-10',
      usageHours: 380,
      location: 'Free Weights Area'
    },
    {
      id: '4',
      name: 'Leg Press Machine 5000',
      type: 'Strength',
      serialNumber: 'LP-2023-001',
      purchaseDate: '2023-02-20',
      status: 'out of service',
      lastMaintenance: '2023-04-01',
      nextMaintenance: '2023-07-01',
      usageHours: 290,
      location: 'Strength Zone'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);


  const statusColors = {
    operational: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    'out of service': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  };

 

 
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(null);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesType = typeFilter ? item.type === typeFilter : true;
    return matchesSearch && matchesStatus && matchesType;
  });

  const equipmentTypes = [...new Set(equipment.map(item => item.type))];

  const handleEdit = (id: string) => {
    navigate(`/equipment/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/equipment/view/${id}`);
  };

  const confirmDelete = (id: string) => {
    setEquipmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (equipmentToDelete) {
      setEquipment(equipment.filter(item => item.id !== equipmentToDelete));
      toast.success('Equipment deleted successfully');
      setDeleteDialogOpen(false);
      setEquipmentToDelete(null);
    }
  };

  const getMaintenanceStatus = (nextMaintenance: string) => {
    const today = new Date();
    const nextDate = new Date(nextMaintenance);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return 'critical';
    if (diffDays <= 30) return 'warning';
    return 'good';
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment Inventory</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all gym equipment and maintenance schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <ExportEquipment equipment={equipment} />
    <Button size="sm" onClick={() => navigate('/equipment/add')}>
      <FiPlus className="mr-2 h-4 w-4" />
      Add Equipment
    </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <FiFilter className="mr-2 h-4 w-4" />
              {statusFilter ? `Status: ${statusFilter}` : 'Filter by Status'}
              <FiChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('operational')}>Operational</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('maintenance')}>Maintenance</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('out of service')}>Out of Service</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <FiFilter className="mr-2 h-4 w-4" />
              {typeFilter ? `Type: ${typeFilter}` : 'Filter by Type'}
              <FiChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTypeFilter(null)}>All Types</DropdownMenuItem>
            {equipmentTypes.map(type => (
              <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="w-full">
          Clear Filters
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Equipment</div>
          <div className="text-2xl font-bold mt-1">{equipment.length}</div>
          <Progress value={100} className="h-2 mt-2" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Operational</div>
          <div className="text-2xl font-bold mt-1">
            {equipment.filter(e => e.status === 'operational').length}
          </div>
          <Progress 
            value={(equipment.filter(e => e.status === 'operational').length / equipment.length * 100)} 
            className="h-2 mt-2 bg-green-100" 
          />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Needs Maintenance</div>
          <div className="text-2xl font-bold mt-1">
            {equipment.filter(e => e.status !== 'operational').length}
          </div>
          <Progress 
            value={(equipment.filter(e => e.status !== 'operational').length / equipment.length * 100)} 
            className="h-2 mt-2 bg-yellow-100" 
          />
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <FiTool className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">SN: {item.serialNumber}</div>
                    <div className="text-sm text-gray-500">{item.location}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`${statusColors[item.status].bg} ${statusColors[item.status].text} ${statusColors[item.status].border}`}>
                      {item.status === 'operational' && <FiCheckCircle className="mr-1 h-3 w-3" />}
                      {item.status === 'maintenance' && <FiAlertTriangle className="mr-1 h-3 w-3" />}
                      {item.status === 'out of service' && <FiAlertTriangle className="mr-1 h-3 w-3" />}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                    <div className="mt-1 text-xs text-gray-500">
                      Usage: {item.usageHours} hours
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Last: {new Date(item.lastMaintenance).toLocaleDateString()}
                    </div>
                    <div className={`text-xs ${
                      getMaintenanceStatus(item.nextMaintenance) === 'critical' ? 'text-red-600 font-medium' : 
                      getMaintenanceStatus(item.nextMaintenance) === 'warning' ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                      Next: {new Date(item.nextMaintenance).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleView(item.id)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FiEye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(item.id)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <FiEdit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => confirmDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEquipment.length}</span> of{' '}
          <span className="font-medium">{equipment.length}</span> results
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
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};