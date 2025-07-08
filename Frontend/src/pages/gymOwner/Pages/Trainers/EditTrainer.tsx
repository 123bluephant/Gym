// src/pages/Trainers/EditTrainer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import { FiArrowLeft, FiUpload, FiUser, FiX } from 'react-icons/fi';
import { Trainer } from '../../types/gymTypes';
import { toast } from 'react-toastify';

const EditTrainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const specializationOptions = [
    'Strength Training', 'Cardio', 'Yoga', 'Pilates', 'CrossFit',
    'Weight Loss', 'Bodybuilding', 'Rehabilitation', 'Nutrition'
  ];

  useEffect(() => {
    const loadTrainer = () => {
      try {
        const savedTrainers = localStorage.getItem('gymTrainers');
        if (savedTrainers) {
          const trainers: Trainer[] = JSON.parse(savedTrainers);
          const foundTrainer = trainers.find(t => t.id === id);
          if (foundTrainer) {
            setTrainer(foundTrainer);
            setPreviewImage(foundTrainer.imageUrl || null);
          } else {
            toast.error('Trainer not found');
            navigate('/gym/trainers');
          }
        } else {
          toast.error('No trainers data available');
          navigate('/gym/trainers');
        }
      } catch (error) {
        console.error('Error loading trainer:', error);
        toast.error('Failed to load trainer data');
        navigate('/gym/trainers');
      }
    };

    loadTrainer();
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!trainer?.name) newErrors.name = 'Name is required';
    if (!trainer?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(trainer.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (trainer?.experience < 0) newErrors.experience = 'Must be positive';
    if (trainer?.rating < 0 || trainer?.rating > 5) newErrors.rating = 'Must be between 0-5';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTrainer(prev => prev ? {
      ...prev,
      [name]: name === 'experience' || name === 'rating' || name === 'clients' 
        ? Number(value) 
        : value
    } : null);
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
    if (!file) return;

    // Validate image file
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setTrainer(prev => prev ? {
        ...prev,
        imageUrl: result
      } : null);
    };
    reader.onerror = () => {
      toast.error('Error reading image file');
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setTrainer(prev => prev ? {
      ...prev,
      imageUrl: ''
    } : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainer) return;
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSaving(true);
    try {
      // Get current trainers from localStorage
      const savedTrainers = localStorage.getItem('gymTrainers');
      if (savedTrainers) {
        const trainers: Trainer[] = JSON.parse(savedTrainers);
        
        // Update the trainer
        const updatedTrainers = trainers.map(t => 
          t.id === trainer.id ? trainer : t
        );
        
        // Save back to localStorage
        localStorage.setItem('gymTrainers', JSON.stringify(updatedTrainers));
        
        toast.success('Trainer updated successfully!');
        navigate(`/gym/trainers/view/${trainer.id}`);
      } else {
        throw new Error('No trainers data available');
      }
    } catch (error) {
      console.error('Failed to save trainer:', error);
      toast.error('Failed to save trainer');
    } finally {
      setIsSaving(false);
    }
  };

  if (!trainer) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/gym/trainers')}  // Fixed typo here
          className="flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Trainers
        </Button>
        <h1 className="text-2xl font-bold">Edit Trainer</h1>
        <Button
          onClick={handleSubmit}
          isLoading={isSaving}
          disabled={isSaving}
        >
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Upload Section */}
            <div className="w-full md:w-1/3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                <div className="flex flex-col items-center">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4 w-full">
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <FiX className="text-gray-600" />
                        </button>
                      </>
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
                    <FiUpload /> {previewImage ? 'Change Image' : 'Upload Image'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name {errors.name && <span className="text-red-500 text-xs"> - {errors.name}</span>}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={trainer.name}
                    onChange={handleChange}
                    required
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email {errors.email && <span className="text-red-500 text-xs"> - {errors.email}</span>}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={trainer.email}
                    onChange={handleChange}
                    required
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (years) {errors.experience && <span className="text-red-500 text-xs"> - {errors.experience}</span>}
                  </label>
                  <input
                    type="number"
                    name="experience"
                    min="0"
                    max="50"
                    value={trainer.experience}
                    onChange={handleChange}
                    className={`w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating {errors.rating && <span className="text-red-500 text-xs"> - {errors.rating}</span>}
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={trainer.rating}
                    onChange={handleChange}
                    className={`w-full border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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
                  placeholder="Tell us about the trainer's background, qualifications, and specialties..."
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