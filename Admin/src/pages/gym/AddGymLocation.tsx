import React from 'react';
import { useNavigate } from 'react-router-dom';
import GymLocationForm from '../../components/GymLocationForm';
import { Plus } from 'lucide-react';

const AddGymLocation: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: {
    name: string;
    address: string;
    phone: string;
    capacity: number;
    operatingHours: string;
    status: 'active' | 'maintenance' | 'closed';
  }) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('New location data:', data);
    setIsSubmitting(false);
    navigate('/gym-locations');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Location</h1>
          <p className="text-gray-600 mt-1">Fill in the details for your new gym location</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <GymLocationForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/gym-locations')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddGymLocation;