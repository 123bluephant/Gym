// src/pages/Trainers/EditTrainer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTrainers } from '../../Data/mockTrainers';
import Button from '../../components/Ui/Button';
import { FiArrowLeft, FiUpload, FiUser } from 'react-icons/fi';
import { Trainer } from '../../types/gymTypes';

const EditTrainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Specialization suggestions
  const specializationOptions = [
    'Strength Training', 'Cardio', 'Yoga', 'Pilates', 'CrossFit',
    'Weight Loss', 'Bodybuilding', 'Rehabilitation', 'Nutrition'
  ];

  useEffect(() => {
    // In a real app, this would fetch from your API
    const foundTrainer = mockTrainers.find(t => t.id === id);
    if (foundTrainer) {
      setTrainer(foundTrainer);
      setPreviewImage(foundTrainer.imageUrl || null);
    } else {
      navigate('/gym/trainers', { replace: true });
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTrainer(prev => prev ? {
      ...prev,
      [name]: name === 'experience' || name === 'rating' || name === 'clients' 
        ? Number(value) 
        : value
    } : null);
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTrainer(prev => {
      if (!prev) return null;
      
      let newSpecializations = [...prev.specialization];
      if (checked) {
        newSpecializations.push(value);
      } else {
        newSpecializations = newSpecializations.filter(s => s !== value);
      }
      
      return {
        ...prev,
        specialization: newSpecializations
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setTrainer(prev => prev ? {
          ...prev,
          imageUrl: result
        } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainer) return;
    
    setIsSaving(true);
    try {
      // In a real app, this would save to your API
      console.log('Saving trainer:', trainer);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate(`/gym/trainers/view/${trainer.id}`, { 
        state: { message: 'Trainer updated successfully!' } 
      });
    } catch (error) {
      console.error('Failed to save trainer:', error);
      setIsSaving(false);
    }
  };

  if (!trainer) {
    return <div className="p-6">Loading trainer...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/gym/trainers')}
          className="flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Trainers
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            isLoading={isSaving}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4 w-full">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUser className="text-gray-400 text-6xl" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <FiUpload /> Upload Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={trainer.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={trainer.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                  <input
                    type="number"
                    name="experience"
                    min="0"
                    max="50"
                    value={trainer.experience}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={trainer.rating}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clients</label>
                  <input
                    type="number"
                    name="clients"
                    min="0"
                    value={trainer.clients}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={trainer.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specializationOptions.map(spec => (
                    <div key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`spec-${spec}`}
                        value={spec}
                        checked={trainer.specialization.includes(spec)}
                        onChange={handleSpecializationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`spec-${spec}`} className="ml-2 text-sm text-gray-700">
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={trainer.bio || ''}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTrainer;