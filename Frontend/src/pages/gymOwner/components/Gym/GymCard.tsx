// src/components/Gym/GymCard.tsx
import React from 'react';
import { Gym } from '../../types/gymTypes';

interface GymCardProps {
  gym: Gym;
  onClick?: () => void;
}

const GymCard: React.FC<GymCardProps> = ({ gym, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Gym Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={gym.imageUrl} 
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium">{gym.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Gym Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{gym.name}</h3>
          <span className="text-sm text-gray-600">{gym.totalMembers.toLocaleString()} members</span>
        </div>
        
        <div className="flex items-center mt-1 text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{gym.location}</span>
        </div>

        {/* Facilities */}
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900">Facilities</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {gym.featuredFacilities.map((facility, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Membership Plans */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Membership Plans</h4>
          <div className="mt-2 space-y-2">
            {gym.membershipPlans.slice(0, 2).map((plan, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{plan.name}</span>
                <span className="font-medium">${plan.price}/mo</span>
              </div>
            ))}
            {gym.membershipPlans.length > 2 && (
              <div className="text-xs text-gray-500">
                +{gym.membershipPlans.length - 2} more plans
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // Handle join/explore action
          }}
        >
          Explore Gym
        </button>
      </div>
    </div>
  );
};

export default GymCard;