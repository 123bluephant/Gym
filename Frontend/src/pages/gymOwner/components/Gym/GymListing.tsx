// src/pages/Gyms/GymListing.tsx
import React from 'react';
import GymCardGrid from '../../components/Gym/GymCardGrid';

const mockGyms = [
  {
    id: '1',
    name: 'Elite Fitness Center',
    location: 'Downtown, New York',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    rating: 4.7,
    totalMembers: 1250,
    featuredFacilities: ['Pool', 'Sauna', 'Yoga Studio', '24/7 Access'],
    membershipPlans: [
      { name: 'Basic', price: 49, features: ['Gym Access', 'Locker'] },
      { name: 'Premium', price: 79, features: ['All Basic', 'Pool Access', 'Group Classes'] },
      { name: 'VIP', price: 129, features: ['All Premium', 'Personal Trainer', 'Sauna'] }
    ]
  },
  {
    id: '2',
    name: 'Iron Temple Gym',
    location: 'Midtown, Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
    rating: 4.5,
    totalMembers: 890,
    featuredFacilities: ['Heavy Weights', 'Powerlifting Area', 'Strongman Equipment'],
    membershipPlans: [
      { name: 'Standard', price: 39, features: ['Gym Access'] },
      { name: 'Pro', price: 59, features: ['All Standard', '24/7 Access'] }
    ]
  },
  // Add more gyms as needed
];

const GymListing: React.FC = () => {
  const handleGymClick = (gym: any) => {
    console.log('Selected gym:', gym);
    // Navigate to gym detail page or show modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Gym</h1>
      <GymCardGrid 
        gyms={mockGyms} 
        onGymClick={handleGymClick}
      />
    </div>
  );
};

export default GymListing;