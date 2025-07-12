// src/pages/gymOwner/Profile.tsx
import React, { useEffect, useState, useRef } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiEdit, FiSave, FiLock, FiCalendar, FiCamera, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import userAtom from '../../../atoms/UserAtom';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { ChevronsUp } from 'lucide-react';

type MembershipPlan = {
  name: string;
  price: string;
  features: string[];
};

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  gymName: string;
  location: string;
  established: string;
  hours: string;
  profilePhoto: string;
  avatar: string;
  gymImages: string[];
  membershipPlans: MembershipPlan[];
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
};

const avatars = [
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
  'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
  'https://cdn-icons-png.flaticon.com/512/236/236832.png',
  'https://cdn-icons-png.flaticon.com/512/3667/3667339.png',
];

const GymOwnerProfile = () => {
  const user = useRecoilValue(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  console.log('User:', user);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    gymName: user?.gymName || '',
    location: user?.location || '',
    established: user?.established || '',
    hours: user?.hours || '',
    profilePhoto: user?.profilePhoto || '',
    avatar: user?.avatar || avatars[0],
    gymImages: Array.isArray(user?.gymImg) ? user.gymImg : [],
    membershipPlans: Array.isArray(user?.membershipPlans) ? user.membershipPlans : [],
    socialMedia: typeof user?.socialMedia === 'object' && user?.socialMedia !== null
      ? user.socialMedia
      : { facebook: '', instagram: '', twitter: '' },
  });

  const [newPlan, setNewPlan] = useState<MembershipPlan>({ name: '', price: '', features: [''] });
  const [selectedAvatar, setSelectedAvatar] = useState(profileData.avatar);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profileData.profilePhoto);
  const [gymImagePreviews, setGymImagePreviews] = useState<string[]>(profileData.gymImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gymImagesInputRef = useRef<HTMLInputElement>(null);
  const [newGymImageFiles, setNewGymImageFiles] = useState<File[]>([]);
  useEffect(() => {
    if (user && user.role !== "gym_owner") {
      <Navigate to="/dashboard" replace />;
    }
  }, []);

  const handleAddFeature = () => {
    setNewPlan(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price) {
      setProfileData(prev => ({
        ...prev,
        membershipPlans: [...prev.membershipPlans, newPlan]
      }));
      setNewPlan({ name: '', price: '', features: [''] });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result as string);
        setProfileData(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGymImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5 - gymImagePreviews.length);
      const newPreviews: string[] = [];
      const newFiles: File[] = [];

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews[index] = reader.result as string;
          newFiles[index] = file;

          if (newPreviews.length === files.length && !newPreviews.includes(undefined as any)) {
            setGymImagePreviews((prev: string[]) => [...prev, ...newPreviews]);
            setNewGymImageFiles((prev: File[]) => [...prev, ...newFiles]);

            // Store the base64 for preview, but keep files for upload
            setProfileData(prev => ({
              ...prev,
              gymImages: [...prev.gymImages, ...newPreviews]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };


  const removeGymImage = (index: number) => {
    setGymImagePreviews((prev: string[]) => prev.filter((_, i) => i !== index));
    setNewGymImageFiles((prev: File[]) => prev.filter((_, i) => i !== index));
    setProfileData(prev => ({
      ...prev,
      gymImages: prev.gymImages.filter((_, i) => i !== index)
    }));
  };

  const selectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    setProfileData(prev => ({ ...prev, avatar }));
    setShowAvatarModal(false);
  };

  function dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('phone', profileData.phone);
      formData.append('bio', profileData.bio);
      formData.append('gymName', profileData.gymName);
      formData.append('location', profileData.location);
      formData.append('established', profileData.established);
      formData.append('hours', profileData.hours);
      if (
        profilePhotoPreview &&
        !profilePhotoPreview.startsWith('http') &&
        profilePhotoPreview !== selectedAvatar
      ) {
        const avatarBlob = dataURLtoBlob(profilePhotoPreview);
        formData.append('avatar', avatarBlob, 'avatar.jpg');
      } else if (selectedAvatar?.startsWith('http')) {
        formData.append('avatarUrl', selectedAvatar);
      }
      const existingImages: any = [];
      profileData.gymImages.forEach((imageUrl) => {
        if (imageUrl.startsWith('http')) {
          existingImages.push(imageUrl);
        }
      });
      if (existingImages.length > 0) {
        formData.append('existingGymImages', JSON.stringify(existingImages));
      }
      newGymImageFiles.forEach((file) => {
        formData.append('gymImg', file);
      });
      if (profileData.membershipPlans && profileData.membershipPlans.length > 0) {
        formData.append('membershipPlans', JSON.stringify(profileData.membershipPlans));
      }
      if (profileData.socialMedia) {
        formData.append('socialMedia', JSON.stringify(profileData.socialMedia));
      }
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await fetch('/api/gym/update', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update');

      if (result.updatedOwner) {
        setProfileData({
          name: result.updatedOwner.name || '',
          email: result.updatedOwner.email || '',
          phone: result.updatedOwner.phone || '',
          bio: result.updatedOwner.bio || '',
          gymName: result.updatedOwner.gymName || '',
          location: result.updatedOwner.location || '',
          established: result.updatedOwner.established || '',
          hours: result.updatedOwner.hours || '',
          profilePhoto: result.updatedOwner.profilePhoto || '',
          avatar: result.updatedOwner.avatar || avatars[0],
          gymImages: Array.isArray(result.updatedOwner.gymImg) ? result.updatedOwner.gymImg : [],
          membershipPlans: Array.isArray(result.updatedOwner.membershipPlans)
            ? result.updatedOwner.membershipPlans
            : [],
          socialMedia:
            typeof result.updatedOwner.socialMedia === 'object' && result.updatedOwner.socialMedia !== null
              ? result.updatedOwner.socialMedia
              : { facebook: '', instagram: '', twitter: '' },
        });

        setProfilePhotoPreview(result.updatedOwner.profilePhoto || '');
        setGymImagePreviews(Array.isArray(result.updatedOwner.gymImg) ? result.updatedOwner.gymImg : []);
        setSelectedAvatar(result.updatedOwner.avatar || avatars[0]);
        setNewGymImageFiles([]);
        localStorage.setItem('user', JSON.stringify(result.updatedOwner));
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gym Owner Profile</h1>
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
              <div className="relative w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden">
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                    >
                      <FiCamera size={16} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfilePhotoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => setShowAvatarModal(true)}
                      className="absolute bottom-0 left-0 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition"
                    >
                      <FiUser size={16} />
                    </button>
                  </>
                )}
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

            {/* Gym Images Section */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Gym Photos</h3>
              {gymImagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {gymImagePreviews.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Gym ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => removeGymImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && gymImagePreviews.length < 5 && (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:border-blue-500 transition"
                      onClick={() => gymImagesInputRef.current?.click()}
                    >
                      <FiPlus size={24} className="text-gray-400" />
                      <input
                        type="file"
                        ref={gymImagesInputRef}
                        onChange={handleGymImagesChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              ) : isEditing ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:border-blue-500 transition"
                  onClick={() => gymImagesInputRef.current?.click()}
                >
                  <div className="text-center">
                    <FiPlus size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Add Gym Photos (max 5)</p>
                  </div>
                  <input
                    type="file"
                    ref={gymImagesInputRef}
                    onChange={handleGymImagesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>
              ) : (
                <p className="text-gray-500">No gym photos added yet</p>
              )}
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">Membership Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {isEditing && (
                <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-gray-700">Add New Plan</h4>
                  <input
                    type="text"
                    placeholder="Plan Name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                  <div>
                    {newPlan.features.map((feature, i) => (
                      <input
                        key={i}
                        type="text"
                        placeholder={`Feature ${i + 1}`}
                        value={feature}
                        onChange={(e) => handleFeatureChange(i, e.target.value)}
                        className="w-full border p-1 rounded mb-1"
                      />
                    ))}
                    <button
                      onClick={handleAddFeature}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add Feature
                    </button>
                  </div>
                  <button
                    onClick={handleAddPlan}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Add Plan
                  </button>
                </div>
              )}

              {profileData.membershipPlans.length > 0 && profileData.membershipPlans.map((plan, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {plan.price}
                    </span>
                  </div>
                  <ul className="text-gray-600 space-y-1">
                    {plan.features.map((feature: any, i: any) => (
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
            {isEditing ? (
              <div className="space-y-2">
                {['facebook', 'instagram', 'twitter'].map((platform) => (
                  <input
                    key={platform}
                    type="text"
                    name={platform}
                    value={(profileData.socialMedia as any)[platform]}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          [platform]: e.target.value
                        }
                      }))
                    }
                    placeholder={`Enter ${platform} URL`}
                    className="w-full border p-2 rounded"
                  />
                ))}
              </div>
            ) : (
              <div className="flex space-x-4">
                {profileData.socialMedia.facebook && (
                  <a href={`${profileData.socialMedia.facebook}`}
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={24} />
                  </a>
                )}
                {profileData.socialMedia.instagram && (
                  <a href={`${profileData.socialMedia.instagram}`}
                    className="text-pink-600 hover:text-pink-800"
                    target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} />
                  </a>
                )}
                {profileData.socialMedia.twitter && (
                  <a href={`${profileData.socialMedia.twitter}`}
                    className="text-blue-400 hover:text-blue-600"
                    target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Select Avatar</h3>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar) => (
                <div
                  key={avatar}
                  className={`p-1 rounded-full cursor-pointer ${selectedAvatar === avatar ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => selectAvatar(avatar)}
                >
                  <img src={avatar} alt="Avatar" className="w-full rounded-full" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymOwnerProfile;