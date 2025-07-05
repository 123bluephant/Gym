// src/pages/Trainers/AddEdit.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import { Trainer } from '../../types/gymTypes';
import { FiX, FiPlus, FiUser, FiCamera } from 'react-icons/fi';

const AddEditTrainer: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditMode] = useState(!!id);
    const [trainer, setTrainer] = useState<Omit<Trainer, 'id'> & { id?: string }>({
        name: '',
        email: '',
        specialization: [],
        experience: 0,
        clients: 0,
        rating: 0,
        status: 'Available',
        imageUrl: '',
        bio: ''
    });
    const [tempSpecialization, setTempSpecialization] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const savedTrainers = localStorage.getItem('gymTrainers');
            if (savedTrainers) {
                const trainers = JSON.parse(savedTrainers) as Trainer[];
                const existingTrainer = trainers.find(t => t.id === id);
                if (existingTrainer) {
                    setTrainer(existingTrainer);
                    if (existingTrainer.imageUrl) {
                        setImagePreview(existingTrainer.imageUrl);
                    }
                }
            }
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTrainer(prev => ({
            ...prev,
            [name]: name === 'experience' || name === 'clients' || name === 'rating'
                ? Number(value)
                : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setTrainer(prev => ({
                    ...prev,
                    imageUrl: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSpecialization = () => {
        if (tempSpecialization.trim() && !trainer.specialization.includes(tempSpecialization)) {
            setTrainer(prev => ({
                ...prev,
                specialization: [...prev.specialization, tempSpecialization.trim()]
            }));
            setTempSpecialization('');
        }
    };

    const handleRemoveSpecialization = (spec: string) => {
        setTrainer(prev => ({
            ...prev,
            specialization: prev.specialization.filter(s => s !== spec)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const savedTrainers = localStorage.getItem('gymTrainers');
        let trainers = savedTrainers ? JSON.parse(savedTrainers) : [];

        if (isEditMode && trainer.id) {
            // Update existing trainer
            trainers = trainers.map((t: Trainer) => t.id === trainer.id ? trainer : t);
        } else {
            // Add new trainer
            const newTrainer: Trainer = {
                ...trainer,
                id: Date.now().toString(),
                rating: trainer.rating || 0,
                clients: trainer.clients || 0
            };
            trainers.push(newTrainer);
        }

        localStorage.setItem('gymTrainers', JSON.stringify(trainers));
        navigate('/gym/trainers');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">
                    {isEditMode ? 'Edit Trainer' : 'Add New Trainer'}
                </h1>
                <Button
                    variant="outline"
                    onClick={() => navigate('/gym/trainers')}
                    icon={<FiX className="mr-1" />}
                >
                    Cancel
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                                {imagePreview ? (
                                    <img 
                                        src={imagePreview} 
                                        alt="Trainer preview" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <FiUser className="text-6xl mb-2" />
                                        <span>No image selected</span>
                                    </div>
                                )}
                                <label className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center cursor-pointer hover:bg-opacity-70">
                                    <FiCamera className="inline mr-2" />
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

                        <div className="w-full md:w-2/3 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={trainer.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={trainer.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)*</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        min="0"
                                        value={trainer.experience}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Clients</label>
                                    <input
                                        type="number"
                                        name="clients"
                                        min="0"
                                        value={trainer.clients}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={trainer.rating}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Busy">Busy</option>
                                    <option value="On Leave">On Leave</option>
                                </select>
                            </div>
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
                                className="flex-1 border border-gray-300 rounded-l-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddSpecialization}
                                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 flex items-center justify-center"
                            >
                                <FiPlus size={18} />
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {trainer.specialization.map(spec => (
                                <span
                                    key={spec}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                >
                                    {spec}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSpecialization(spec)}
                                        className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700"
                                    >
                                        <FiX size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={trainer.bio || ''}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tell us about the trainer..."
                        />
                    </div>

                    <div className="pt-4 border-t">
                        <Button type="submit" className="w-full md:w-auto">
                            {isEditMode ? 'Update Trainer' : 'Add Trainer'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditTrainer;