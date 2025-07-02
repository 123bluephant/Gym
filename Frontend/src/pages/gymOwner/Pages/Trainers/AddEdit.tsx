// src/pages/Trainers/AddEdit.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import { Trainer } from '../../types/gymTypes';
import { FiX, FiPlus, FiUser } from 'react-icons/fi';

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
        status: 'Available'
    });
    const [tempSpecialization, setTempSpecialization] = useState('');

    useEffect(() => {
        if (id) {
            const savedTrainers = localStorage.getItem('gymTrainers');
            if (savedTrainers) {
                const trainers = JSON.parse(savedTrainers) as Trainer[];
                const existingTrainer = trainers.find(t => t.id === id);
                if (existingTrainer) {
                    setTrainer(existingTrainer);
                }
            }
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTrainer(prev => ({
            ...prev,
            [name]: name === 'experience' || name === 'clients' || name === 'rating'
                ? Number(value)
                : value
        }));
    };

    const handleAddSpecialization = () => {
        if (tempSpecialization && !trainer.specialization.includes(tempSpecialization)) {
            setTrainer(prev => ({
                ...prev,
                specialization: [...prev.specialization, tempSpecialization]
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
                id: Date.now().toString()
            };
            trainers.push(newTrainer);
        }

        // Save to localStorage
        localStorage.setItem('gymTrainers', JSON.stringify(trainers));

        // Navigate back to list
        navigate('/gym/trainers');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
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

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                            <input
                                type="text"
                                name="name"
                                value={trainer.name}
                                onChange={handleInputChange}
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={tempSpecialization}
                                onChange={(e) => setTempSpecialization(e.target.value)}
                                placeholder="Add specialization"
                                className="flex-1 border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddSpecialization}
                                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
                            >
                                <FiPlus />
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                        <select
                            name="status"
                            value={trainer.status}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t">
                        <Button type="submit" className="w-full">
                            {isEditMode ? 'Update Trainer' : 'Add Trainer'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditTrainer;