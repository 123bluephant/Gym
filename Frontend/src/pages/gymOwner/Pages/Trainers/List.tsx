// src/pages/Trainers/List.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTrainers } from '../../Data/mockTrainers';
import Button from '../../components/Ui/Button';
import { FiEdit2, FiTrash2, FiPlus, FiUser } from 'react-icons/fi';
import { Trainer } from '../../types/gymTypes';

const TrainersList: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTrainers = localStorage.getItem('gymTrainers');
    if (savedTrainers) {
      setTrainers(JSON.parse(savedTrainers));
    } else {
      setTrainers(mockTrainers);
      localStorage.setItem('gymTrainers', JSON.stringify(mockTrainers));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      const updatedTrainers = trainers.filter(trainer => trainer.id !== id);
      setTrainers(updatedTrainers);
      localStorage.setItem('gymTrainers', JSON.stringify(updatedTrainers));
    }
  };

  const filteredTrainers = filter === 'all' 
    ? trainers 
    : trainers.filter(trainer => trainer.status.toLowerCase() === filter);

  const statusFilters = ['all', ...new Set(trainers.map(trainer => trainer.status.toLowerCase()))];

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Trainer Management</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 w-full"
            >
              {statusFilters.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => navigate('/gym/trainers/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FiPlus /> Add Trainer
          </button>
        </div>
      </div>

      {filteredTrainers.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <p className="text-gray-500 mb-4">No trainers found</p>
          <button
            onClick={() => navigate('/gym/trainers/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <FiPlus /> Add Your First Trainer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTrainers.map(trainer => (
            <div 
              key={trainer.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-gray-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{trainer.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{trainer.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 my-3 text-sm">
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium">{trainer.experience} yrs</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Rating</p>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{trainer.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Clients</p>
                    <p className="font-medium">{trainer.clients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${trainer.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        trainer.status === 'Busy' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                      {trainer.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Specializations</p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specialization.map(spec => (
                      <span key={spec} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/gym/trainers/view/${trainer.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/trainers/edit/${trainer.id}`);

                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(trainer.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainersList;