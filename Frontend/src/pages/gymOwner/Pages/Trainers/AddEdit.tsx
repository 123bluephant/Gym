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
            console.log("Form data:", formData);
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
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">{id ? 'Edit Trainer' : 'Add New Trainer'}</h1>
                <Button variant="outline" onClick={() => navigate('/gym/trainers')} icon={<FiX className="mr-1" />}>
                    Cancel
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                    <FiUser className="text-6xl mb-2" />
                                    <span>No image selected</span>
                                </div>
                            )}
                            <label className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center cursor-pointer">
                                <FiCamera className="inline mr-2" />
                                {imagePreview ? 'Change Image' : 'Upload Image'}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="fullName"
                                type="text"
                                value={trainer.fullName}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                required
                                className="w-full border rounded p-2"
                            />
                            <input
                                name="email"
                                type="email"
                                value={trainer.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                name="experience"
                                type="text"
                                value={trainer.experience}
                                onChange={handleInputChange}
                                placeholder="Experience"
                                required
                                className="w-full border rounded p-2"
                            />
                            <input
                                name="currentClients"
                                type="text"
                                value={trainer.currentClients}
                                onChange={handleInputChange}
                                placeholder="Clients"
                                className="w-full border rounded p-2"
                            />
                            <input
                                name="rating"
                                type="text"
                                value={trainer.rating}
                                onChange={handleInputChange}
                                placeholder="Rating"
                                max={5}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <select
                            name="status"
                            value={trainer.status}
                            onChange={handleInputChange}
                            required
                            className="w-full border rounded p-2"
                        >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={tempSpecialization}
                            onChange={(e) => setTempSpecialization(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialization())}
                            placeholder="Add specialization"
                            className="flex-1 border border-gray-300 rounded-l-md p-2"
                        />
                        <button
                            type="button"
                            onClick={handleAddSpecialization}
                            className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
                        >
                            <FiPlus size={18} />
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {trainer.specializations.map((spec) => (
                            <span
                                key={spec}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                                {spec}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpecialization(spec)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    <FiX size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <textarea
                        name="bio"
                        value={trainer.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border rounded p-2"
                        placeholder="Bio"
                    />
                </div>

                <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (id ? 'Update Trainer' : 'Add Trainer')}
                </Button>
            </form>
        </div>
    );
};

export default AddEditTrainer;