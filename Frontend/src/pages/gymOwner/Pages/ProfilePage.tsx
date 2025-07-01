// src/pages/gymOwner/Profile.tsx
import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiDollarSign, FiClock, FiEdit, FiSave, FiLock, FiCalendar } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const GymOwnerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@gym.com',
    phone: '+1 (555) 123-4567',
    bio: 'Certified fitness trainer with 10+ years of experience in bodybuilding and functional training.',
    gymName: 'Elite Fitness Center',
    location: '123 Fitness Ave, New York, NY 10001',
    established: '2015',
    hours: 'Mon-Fri: 5:00 AM - 11:00 PM\nSat-Sun: 7:00 AM - 9:00 PM',
    membershipPlans: [
      { name: 'Basic', price: '$49/month', features: ['Gym Access', 'Locker'] },
      { name: 'Premium', price: '$79/month', features: ['Gym Access', 'Locker', 'Group Classes'] },
      { name: 'VIP', price: '$129/month', features: ['24/7 Access', 'Personal Trainer', 'All Classes'] }
    ],
    socialMedia: {
      facebook: 'elitefitness',
      instagram: 'elitefitness_ny',
      twitter: 'elitefit_ny'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically call an API to save the changes
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gym Owner Profile</h1>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiSave className="mr-2" /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <FiEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FiUser className="text-blue-500 text-5xl" />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="text-xl font-bold text-center mb-1 border rounded p-1 w-full"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
              )}
              <p className="text-gray-500">Gym Owner</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <FiMail className="text-gray-500 mt-1 mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="flex-1 border rounded p-1"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.email}</span>
                )}
              </div>

              <div className="flex items-start">
                <FiPhone className="text-gray-500 mt-1 mr-3" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="flex-1 border rounded p-1"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.phone}</span>
                )}
              </div>

              <div className="flex items-start">
                <FiLock className="text-gray-500 mt-1 mr-3" />
                <button className="text-blue-600 hover:underline">Change Password</button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">About</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 h-24"
                />
              ) : (
                <p className="text-gray-600">{profileData.bio}</p>
              )}
            </div>
          </div>

          {/* Gym Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Gym Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FiMapPin className="mr-2" /> Gym Name
                </h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="gymName"
                    value={profileData.gymName}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.gymName}</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FiCalendar className="mr-2" /> Established
                </h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="established"
                    value={profileData.established}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.established}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FiMapPin className="mr-2" /> Location
                </h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.location}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FiClock className="mr-2" /> Operating Hours
                </h3>
                {isEditing ? (
                  <textarea
                    name="hours"
                    value={profileData.hours}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2 h-20"
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-line">{profileData.hours}</p>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">Membership Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {profileData.membershipPlans.map((plan, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {plan.price}
                    </span>
                  </div>
                  <ul className="text-gray-600 space-y-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href={`https://facebook.com/${profileData.socialMedia.facebook}`} 
                 className="text-blue-600 hover:text-blue-800"
                 target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href={`https://instagram.com/${profileData.socialMedia.instagram}`} 
                 className="text-pink-600 hover:text-pink-800"
                 target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href={`https://twitter.com/${profileData.socialMedia.twitter}`} 
                 className="text-blue-400 hover:text-blue-600"
                 target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymOwnerProfile;