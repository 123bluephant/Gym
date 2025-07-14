import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Button from '../../components/Ui/Button';
import { FiArrowLeft, FiUpload, FiUser, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { trainerAtom, trainerListAtom } from '../../../../atoms/trainerAtom';

const EditTrainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useRecoilState(trainerAtom);
  const [trainerList, setTrainerList] = useRecoilState(trainerListAtom);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const specializationOptions = [
    'Strength Training', 'Cardio', 'Yoga', 'Pilates', 'CrossFit',
    'Weight Loss', 'Bodybuilding', 'Rehabilitation', 'Nutrition'
  ];

  useEffect(() => {
    const loadTrainer = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/gym/getTrainers/${id}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch trainer');
        }
        
        const data = await res.json();
        setTrainer(data?.trainer);
        setPreviewImage(data.trainer.image || null);
        setImageRemoved(false);
        setSelectedFile(null);
        
      } catch (error) {
        console.error('Error loading trainer:', error);
        toast.error('Failed to load trainer data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadTrainer();
    }
  }, [id, navigate, setTrainer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!trainer?.fullName) newErrors.fullName = 'Name is required';
    if (!trainer?.email) {
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
      [name]: name === 'experience' || name === 'rating' || name === 'currentClients' 
        ? Number(value) 
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
      let newSpecializations = [...prev.specializations];
      if (checked) {
        newSpecializations.push(value);
      } else {
        newSpecializations = newSpecializations.filter(s => s !== value);
      }
      
      return {
        ...prev,
        specializations: newSpecializations
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

    setSelectedFile(file);
    setImageRemoved(false);

    const reader = new FileReader();
    reader.onloadstart = () => {
      toast.info('Uploading image...');
    };
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewImage(result);
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
    setSelectedFile(null);
    setImageRemoved(true);
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
      const formData = new FormData();
      formData.append('fullName', trainer.fullName);
      formData.append('email', trainer.email);
      formData.append('experience', trainer.experience.toString());
      formData.append('currentClients', trainer.currentClients.toString());
      formData.append('rating', trainer.rating.toString());
      formData.append('status', trainer.status);
      formData.append('bio', trainer.bio);
      trainer.specializations.forEach((spec) => formData.append('specializations', spec));
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (imageRemoved) {
        formData.append('removeImage', 'true');
      } else if (trainer.image) {
        formData.append('existingImage', trainer.image);
      }
      
      formData.append('trainerId', trainer._id);

      const response = await fetch(`/api/gym/editTrainer`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update trainer');
      }

      setTrainerList(prev => 
        prev.map(t => t._id === trainer._id ? { ...trainer, ...result } : t)
      );
      
      toast.success('Trainer updated successfully!');
      navigate('/gym/trainers');
      
    } catch (error) {
      console.error('Failed to save trainer:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save trainer');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/gym/trainers')}
          className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
        >
          <FiArrowLeft /> Back to Trainers
        </Button>
        
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left w-full sm:w-auto">
          Edit Trainer
        </h1>
        
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSaving}
          className="w-full sm:w-auto justify-center"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Upload Section - Full width on mobile, 1/3 on larger screens */}
            <div className="w-full lg:w-1/3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex flex-col items-center">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4 w-full max-w-xs mx-auto">
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          alt={trainer.fullName}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <FiX className="text-gray-600" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
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
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <FiUpload /> {previewImage ? 'Change Image' : 'Upload Image'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Fields Section - Full width on mobile, 2/3 on larger screens */}
            <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
              {/* Basic Info - Stack on mobile, 2 columns on medium+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name {errors.fullName && <span className="text-red-500 text-xs"> - {errors.fullName}</span>}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={trainer.fullName}
                    onChange={handleChange}
                    required
                    className={`w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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

              {/* Stats - 1 column on mobile, 3 columns on medium+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Clients</label>
                  <input
                    type="number"
                    name="currentClients"
                    min="0"
                    value={trainer.currentClients}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Status - Full width */}
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
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              {/* Specializations - 1 column on mobile, 2 on medium, 3 on large */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {specializationOptions.map(spec => (
                    <div key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`spec-${spec}`}
                        value={spec}
                        checked={trainer.specializations?.includes(spec)}
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

              {/* Bio - Full width */}
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