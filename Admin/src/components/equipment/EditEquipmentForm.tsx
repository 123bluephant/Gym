import { useState, useEffect } from 'react';
import { FiSave, FiX, FiTool, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const mockEquipment = {
  id: '1',
  name: 'Treadmill Pro X1',
  type: 'Cardio',
  serialNumber: 'TRD-2022-001',
  purchaseDate: '2022-01-15',
  status: 'operational',
  lastMaintenance: '2023-06-01',
  nextMaintenance: '2023-09-01',
  usageHours: '450',
  location: 'Main Gym Floor',
  notes: 'Needs regular lubrication'
};

export const EditEquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    purchaseDate: '',
    status: 'operational',
    lastMaintenance: '',
    nextMaintenance: '',
    usageHours: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    // In a real app, you would fetch the equipment data by ID here
    setFormData(mockEquipment);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the equipment in your backend here
    toast.success('Equipment updated successfully!');
    navigate('/equipment');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      // In a real app, you would delete the equipment from your backend here
      toast.success('Equipment deleted successfully!');
      navigate('/equipment');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FiTool className="text-indigo-600" />
          Edit Equipment
        </h2>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={handleDelete}>
            <FiTrash2 className="mr-2" />
            Delete
          </Button>
          <Button variant="outline" onClick={() => navigate('/equipment')}>
            <FiX className="mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Same form fields as AddEquipmentForm */}
        {/* ... */}
        
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/equipment')}>
            Cancel
          </Button>
          <Button type="submit">
            <FiSave className="mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};