// src/pages/Trainers/ViewTrainer.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTrainers } from '../../Data/mockTrainers';
import Button from '../../components/Ui/Button';
import { FiEdit, FiTrash2, FiArrowLeft, FiUser } from 'react-icons/fi';
import Modal from '../../components/Ui/Modal';
import { Trainer } from '../../types/gymTypes';

const ViewTrainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const foundTrainer = mockTrainers.find(t => t.id === id);
    if (foundTrainer) {
      setTrainer(foundTrainer);
    } else {
      navigate('/gym/trainers', { replace: true });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // In a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/gym/trainers', { state: { message: 'Trainer deleted successfully' } });
    } catch (error) {
      console.error('Failed to delete trainer:', error);
      setIsDeleting(false);
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
            onClick={() => navigate(`/gym/trainers/edit/${trainer.id}`)}
            className="flex items-center gap-2"
          >
            <FiEdit /> Edit Trainer
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2"
          >
            <FiTrash2 /> Delete
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                {trainer.imageUrl ? (
                  <img
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiUser className="text-gray-400 text-6xl" />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
              <p className="text-gray-600 mb-6">{trainer.email}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="text-lg">{trainer.experience} years</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{trainer.rating}</span>
                    <span className="text-yellow-400 text-lg">★</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Clients</h3>
                  <p className="text-lg">{trainer.clients}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                    ${trainer.status === 'Available' ? 'bg-green-100 text-green-800' : 
                      trainer.status === 'Busy' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {trainer.status}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {trainer.bio && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Bio</h3>
                  <p className="text-gray-700 whitespace-pre-line">{trainer.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {trainer.name}? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete Trainer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewTrainer;