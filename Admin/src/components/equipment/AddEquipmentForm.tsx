import { useState } from 'react';
import { FiSave, FiX, FiPlus, FiTool } from 'react-icons/fi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const AddEquipmentForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save to your backend here
    toast.success('Equipment added successfully!');
    navigate('/equipment');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FiTool className="text-indigo-600" />
          Add New Equipment
        </h2>
        <Button variant="outline" onClick={() => navigate('/equipment')}>
          <FiX className="mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Equipment Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Treadmill Pro X1"
            />
          </div>

          <div>
            <Label htmlFor="type">Equipment Type *</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, type: value })}
              value={formData.type}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="Strength">Strength</SelectItem>
                <SelectItem value="Functional">Functional</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="serialNumber">Serial Number *</Label>
            <Input
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              required
              placeholder="TRD-2023-001"
            />
          </div>

          <div>
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="status">Status *</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, status: value })}
              value={formData.status}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="out of service">Out of Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Main Gym Floor"
            />
          </div>

          <div>
            <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
            <Input
              id="lastMaintenance"
              name="lastMaintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="nextMaintenance">Next Maintenance Date</Label>
            <Input
              id="nextMaintenance"
              name="nextMaintenance"
              type="date"
              value={formData.nextMaintenance}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="usageHours">Usage Hours</Label>
            <Input
              id="usageHours"
              name="usageHours"
              type="number"
              value={formData.usageHours}
              onChange={handleChange}
              placeholder="450"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional information about the equipment"
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/equipment')}>
            Cancel
          </Button>
          <Button type="submit">
            <FiSave className="mr-2" />
            Save Equipment
          </Button>
        </div>
      </form>
    </div>
  );
};