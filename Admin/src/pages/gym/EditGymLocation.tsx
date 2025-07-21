import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GymLocationForm from '../../components/GymLocationForm';
import { Edit } from 'lucide-react';

interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  currentMembers: number;
  operatingHours: string;
  status: 'active' | 'maintenance' | 'closed';
}

const mockLocations: LocationData[] = [
  {
    id: '1',
    name: 'FitFlow Downtown',
    address: '123 Main St, Downtown, NY 10001',
    phone: '+1 (555) 123-4567',
    capacity: 500,
    currentMembers: 342,
    operatingHours: '5:00 AM - 11:00 PM',
    status: 'active'
  },
  {
    id: '2',
    name: 'FitFlow Westside',
    address: '456 West Ave, Westside, NY 10002',
    phone: '+1 (555) 234-5678',
    capacity: 300,
    currentMembers: 198,
    operatingHours: '6:00 AM - 10:00 PM',
    status: 'active'
  },
  {
    id: '3',
    name: 'FitFlow Express',
    address: '789 Quick St, Midtown, NY 10003',
    phone: '+1 (555) 345-6789',
    capacity: 150,
    currentMembers: 89,
    operatingHours: '24/7',
    status: 'maintenance'
  }
];

const EditGymLocation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const location = mockLocations.find(loc => loc.id === id);

  if (!location) {
    return <div>Location not found</div>;
  }

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
    console.log('Updated location data:', { ...data, id });
    setIsSubmitting(false);
    navigate('/gym-locations');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Location</h1>
          <p className="text-gray-600 mt-1">Update the details for {location.name}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <GymLocationForm
          initialData={location}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/gym-locations')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditGymLocation;