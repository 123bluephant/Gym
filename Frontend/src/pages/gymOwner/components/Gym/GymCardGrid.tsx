// src/components/Gym/GymCardGrid.tsx
import React from 'react';
import GymCard from './GymCard';
import { Gym } from '../../types/gymTypes';

interface GymCardGridProps {
  gyms: Gym[];
  onGymClick?: (gym: Gym) => void;
}

const GymCardGrid: React.FC<GymCardGridProps> = ({ gyms, onGymClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {gyms.map(gym => (
        <GymCard 
          key={gym.id} 
          gym={gym} 
          onClick={() => onGymClick?.(gym)}
        />
      ))}
    </div>
  );
};

export default GymCardGrid;