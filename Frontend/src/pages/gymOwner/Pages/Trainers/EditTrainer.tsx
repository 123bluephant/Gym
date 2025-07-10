// src/pages/Trainers/EditTrainer.tsx
// src/pages/Trainers/EditTrainer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import { FiArrowLeft, FiUpload, FiUser, FiX } from 'react-icons/fi';
import { Trainer } from '../../types/gymTypes';
import { toast } from 'react-toastify';

interface TrainerForm extends Trainer {
  id: string;
  name: string;
  email: string;
  experience: number;
  rating: number;
  clients: number;
  status: 'Active' | 'Inactive' | 'On Leave' | 'Available';
  specialization: string[];
  bio: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const defaultTrainer: TrainerForm = {
  id: '',
  name: '',
  email: '',
  experience: 0,
  rating: 0,
  clients: 0,
  status: 'Available',
  specialization: [],
  bio: '',
  imageUrl: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  specializations: []
};

const specializationOptions = [
  'Strength Training', 'Cardio', 'Yoga', 'Pilates', 'CrossFit',
  'Weight Loss', 'Bodybuilding', 'Rehabilitation', 'Nutrition'
];

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const EditTrainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<TrainerForm>(defaultTrainer);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) {
      toast.error('Invalid trainer ID');
      navigate('/gym/trainers');
      return;
    }

    const loadTrainer = () => {
      try {
        const savedTrainers = localStorage.getItem('gymTrainers');
        if (!savedTrainers) {
          throw new Error('No trainers data available');
        }

        const trainers: TrainerForm[] = JSON.parse(savedTrainers);
        const foundTrainer = trainers.find(t => t.id === id);

        if (!foundTrainer) {
          throw new Error('Trainer not found');
        }

        setTrainer({
          ...defaultTrainer,
          ...foundTrainer,
          updatedAt: new Date().toISOString()
        });
        setPreviewImage(foundTrainer.imageUrl || null);
      } catch (error) {
        console.error('Error loading trainer:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to load trainer data');
        navigate('/gym/trainers');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrainer();
  }, [id, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!trainer.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!trainer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trainer.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (trainer.experience < 0 || trainer.experience > 50) {
      newErrors.experience = 'Must be between 0-50 years';
    }

    if (trainer.rating < 0 || trainer.rating > 5) {
      newErrors.rating = 'Must be between 0-5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setTrainer(prev => ({
      ...prev,
      [name]: name === 'experience' || name === 'rating' || name === 'clients' 
        ? Math.max(0, isNaN(Number(value)) ? 0 : Number(value))
        : value
    }));

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
      const newSpecializations = checked
        ? [...prev.specialization, value]
        : prev.specialization.filter(s => s !== value);
      
      return {
        ...prev,
        specialization: [...new Set(newSpecializations)] // Ensure uniqueness
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(`Image must be smaller than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      toast.info('Uploading image...');
    };
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setTrainer(prev => ({
        ...prev,
        imageUrl: result
      }));
      toast.success('Image uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setTrainer(prev => ({
      ...prev,
      imageUrl: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Profile image removed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsSaving(true);
    try {
      const savedTrainers = localStorage.getItem('gymTrainers');
      if (!savedTrainers) {
        throw new Error('No trainers data available');
      }

      const trainers: TrainerForm[] = JSON.parse(savedTrainers);
      const updatedTrainers = trainers.map(t => 
        t.id === trainer.id ? {
          ...trainer,
          updatedAt: new Date().toISOString()
        } : t
      );

      localStorage.setItem('gymTrainers', JSON.stringify(updatedTrainers));
      toast.success('Trainer updated successfully!');
      navigate(`/gym/trainers/view/${trainer.id}`);
    } catch (error) {
      console.error('Failed to save trainer:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save trainer');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
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
          onClick={() => navigate('/gym/trainers')}
          className="flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Trainers
        </Button>
        <h1 className="text-2xl font-bold">Edit Trainer</h1>
        <Button
          type="submit"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex flex-col items-center">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4 w-full">
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          alt={`Profile of ${trainer.name}`}
                          className="w-full h-full object-cover"
                          aria-label="Trainer profile image"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                          aria-label="Remove profile image"
                        >
                          <FiX className="text-gray-600" />
                        </button>
                      </>
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center bg-gray-100"
                        aria-label="No profile image"
                      >
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
                    aria-label="Upload profile image"
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
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
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
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
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
                    aria-invalid={!!errors.experience}
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
                    aria-invalid={!!errors.rating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clients
                  </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={trainer.bio}
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