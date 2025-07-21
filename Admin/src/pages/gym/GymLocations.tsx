import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit, Trash2, Clock, Users, Phone } from 'lucide-react';

interface GymLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  currentMembers: number;
  operatingHours: string;
  status: 'active' | 'maintenance' | 'closed';
}

const GymLocations: React.FC = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<GymLocation[]>([
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
  ]);

  const handleAddLocation = () => {
    navigate('/gym-locations/add');
  };

  const handleEditLocation = (locationId: string) => {
    navigate(`/gym-locations/edit/${locationId}`);
  };

  const handleDeleteLocation = (locationId: string) => {
    if (window.confirm('Are you sure you want to remove this location?')) {
      setLocations(locations.filter(location => location.id !== locationId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gym Locations</h1>
          <p className="text-gray-600 mt-1">Manage all your gym locations and facilities</p>
        </div>
        <button 
          onClick={handleAddLocation}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{location.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                    {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEditLocation(location.id)}
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteLocation(location.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{location.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{location.operatingHours}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Capacity</span>
                <span className="text-sm text-gray-600">
                  {location.currentMembers}/{location.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getCapacityPercentage(location.currentMembers, location.capacity)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {getCapacityPercentage(location.currentMembers, location.capacity)}% occupied
                </span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{location.currentMembers} active</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymLocations;