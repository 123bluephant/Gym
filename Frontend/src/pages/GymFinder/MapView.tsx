import React from 'react';
import { MapPin } from 'lucide-react';
import { Gym, Location } from '../../types/gym';

interface MapViewProps {
  gyms: Gym[];
  userLocation: Location | null;
}

const MapView: React.FC<MapViewProps> = ({ gyms, userLocation }) => {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">Map View</h3>
        <p className="text-gray-500 text-sm">
          Interactive map showing {gyms.length} gyms near you
        </p>
        {userLocation && (
          <p className="text-xs text-gray-400 mt-2">
            Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
};

export default MapView;