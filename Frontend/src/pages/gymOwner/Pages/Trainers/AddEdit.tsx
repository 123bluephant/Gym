import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import { FiX, FiPlus, FiUser, FiCamera } from 'react-icons/fi';

const AddEditTrainer: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tempSpecialization, setTempSpecialization] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [trainer, setTrainer] = useState({
        _id: '',
        fullName: '',
        email: '',
        experience: 0,
        currentClients: 0,
        rating: 0,
        status: 'Available',
        specializations: [] as string[],
        bio: '',
        image: '',
        gymOwner: '',
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
        if (id) {
            // Fetch trainer data if editing
        }
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setTrainer((prev) => ({
            ...prev,
            [name]:
                ['experience', 'currentClients', 'rating'].includes(name) && !isNaN(Number(value))
                    ? Number(value)
                    : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleAddSpecialization = () => {
        const trimmed = tempSpecialization.trim();
        if (trimmed && !trainer.specializations.includes(trimmed)) {
            setTrainer((prev) => ({
                ...prev,
                specializations: [...prev.specializations, trimmed],
            }));
            setTempSpecialization('');
        }
    };

    const handleRemoveSpecialization = (spec: string) => {
        setTrainer((prev) => ({
            ...prev,
            specializations: prev.specializations.filter((s) => s !== spec),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
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
            if (imageFile) formData.append('image', imageFile);
            if (id) formData.append('trainerId', id);

            const response = await fetch(`/api/gym/${id ? 'editTrainer' : 'addtrainers'}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to save trainer');
            }

            navigate('/gym/trainers');
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save trainer');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {id ? 'Edit Trainer' : 'Add New Trainer'}
                </h1>
                <Button 
                    variant="outline" 
                    onClick={() => navigate('/gym/trainers')} 
                    icon={<FiX className="mr-1" />}
                    className="w-full sm:w-auto"
                >
                    Cancel
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg border space-y-4 sm:space-y-6">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                        <div className="relative h-48 sm:h-64 bg-gray-100 rounded-lg overflow-hidden">
                            {imagePreview ? (
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                    <FiUser className="text-4xl sm:text-6xl mb-2" />
                                    <span className="text-xs sm:text-sm">No image selected</span>
                                </div>
                            )}
                            <label className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center cursor-pointer text-xs sm:text-sm">
                                <FiCamera className="inline mr-1 sm:mr-2" />
                                {imagePreview ? 'Change Image' : 'Upload Image'}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                />
                            </label>
                        </div>
                    </div>

                    {/* Form Fields Section */}
                    <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    value={trainer.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full border rounded p-2 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={trainer.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                    className="w-full border rounded p-2 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)*</label>
                                <input
                                    name="experience"
                                    type="number"
                                    value={trainer.experience}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                    required
                                    className="w-full border rounded p-2 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Clients</label>
                                <input
                                    name="currentClients"
                                    type="number"
                                    value={trainer.currentClients}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                    className="w-full border rounded p-2 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                <input
                                    name="rating"
                                    type="number"
                                    value={trainer.rating}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="1"
                                    max="5"
                                    className="w-full border rounded p-2 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                            <select
                                name="status"
                                value={trainer.status}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded p-2 text-sm sm:text-base"
                            >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Specializations Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={tempSpecialization}
                            onChange={(e) => setTempSpecialization(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialization())}
                            placeholder="Add specialization"
                            className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={handleAddSpecialization}
                            className="bg-blue-500 text-white px-3 sm:px-4 rounded-r-md hover:bg-blue-600 transition-colors"
                            aria-label="Add specialization"
                        >
                            <FiPlus size={18} />
                        </button>
                    </div>
                    {trainer.specializations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {trainer.specializations.map((spec) => (
                                <span
                                    key={spec}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800"
                                >
                                    {spec}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSpecialization(spec)}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                        aria-label={`Remove ${spec}`}
                                    >
                                        <FiX size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bio Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={trainer.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border rounded p-2 text-sm sm:text-base"
                        placeholder="Tell us about the trainer's qualifications, specialties, and approach..."
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button 
                        type="submit" 
                        className="w-full sm:w-auto px-6 py-2" 
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            id ? 'Update Trainer' : 'Add Trainer'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddEditTrainer;