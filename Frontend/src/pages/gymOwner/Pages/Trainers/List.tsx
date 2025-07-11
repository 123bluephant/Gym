// src/pages/Trainers/List.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import DataTable from '../../components/Ui/DataTable';
import Modal from '../../components/Ui/Modal';
import { FiEdit2, FiTrash2, FiPlus, FiUser, FiSearch, FiEye, FiClock, FiAward } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { trainerListAtom, TrainerType } from '../../../../atoms/trainerAtom';

interface TableRowData extends TrainerType {
  experience: number;
  rating: React.ReactNode;
  status: React.ReactNode;
  actions: React.ReactNode;
}

const TrainersList: React.FC = () => {
  const [trainers, setTrainers] = useRecoilState(trainerListAtom);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/gym/getTrainers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch trainers: ${response.status}`);
        }

        const data = await response.json();

        // Ensure the response is an array
        if (Array.isArray(data)) {
          setTrainers(data);
        } else if (data && Array.isArray(data.trainers)) {
          setTrainers(data.trainers);
        } else if (data && Array.isArray(data.data)) {
          setTrainers(data.data);
        } else {
          console.error('API response is not in expected format:', data);
          setTrainers([]);
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
        setError('Failed to load trainers. Please try again.');
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [setTrainers]);

  const handleDelete = async (id: string) => {
    if (!Array.isArray(trainers)) {
      console.error('Trainers is not an array:', trainers);
      return;
    }

    const trainerToDelete = trainers.find((t: TrainerType) => t._id === id);
    if (!trainerToDelete) return;

    if (window.confirm(`Are you sure you want to delete ${trainerToDelete.fullName}?`)) {
      try {
        const response = await fetch(`/api/gym/deleteTrainer/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete trainer');
        }

        const updatedTrainers = trainers.filter((trainer: TrainerType) => trainer._id !== id);
        setTrainers(updatedTrainers);

        if (selectedTrainer?._id === id) {
          setIsModalOpen(false);
          setSelectedTrainer(null);
        }
      } catch (error) {
        console.error('Error deleting trainer:', error);
        alert('Failed to delete trainer. Please try again.');
      }
    }
  };
const handleEdit = () => {
    const path = `/gym/trainers/edit/${selectedTrainer?._id}`;
    console.log(path); // Log the path
    navigate(path);    // Navigate to the path
  };
  // Ensure trainers is an array before filtering
  const filteredTrainers = Array.isArray(trainers) ? trainers.filter(trainer =>
    trainer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trainer.specializations && trainer.specializations.some((spec: string) =>
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ) : [];

  const columns = [
    { header: 'Name', accessor: 'fullName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Rating', accessor: 'rating' },
    { header: 'Status', accessor: 'status' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      cell: (row: { original: TrainerType }) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTrainer(row.original);
              setIsModalOpen(true);
            }}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 flex items-center gap-1"
          >
            <FiEye size={14} />
            View
          </button>
          <Link
            to={`/gym/trainers/edit/${row.original._id}`}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <FiEdit2 size={14} />
            Edit
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.original._id);
            }}
            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 flex items-center gap-1"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      )
    }
  ];

  const tableData: TableRowData[] = filteredTrainers.map((trainer: TrainerType) => ({
    ...trainer,
    experience: `${trainer.experience} years`,
    rating: (
      <div className="flex items-center gap-1">
        <span>{trainer.rating}</span>
        <span className="text-yellow-400">★</span>
      </div>
    ),
    status: (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${trainer.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {trainer.status}
      </span>
    ),
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTrainer(trainer);
            setIsModalOpen(true);
          }}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 flex items-center gap-1"
        >
          <FiEye size={14} />
          View
        </button>
        <Link
          to={`/gym/trainers/edit/${trainer._id}`}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <FiEdit2 size={14} />
          Edit
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(trainer._id);
          }}
          className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 flex items-center gap-1"
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>
    )
  }));

  const TrainerCard: React.FC<{ trainer: TrainerType }> = ({ trainer }) => {
    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 cursor-pointer"
        onClick={() => {
          setSelectedTrainer(trainer);
          setIsModalOpen(true);
        }}
      >
        <div className="h-48 w-full bg-gray-200 overflow-hidden">
          {trainer.image ? (
            <img
              src={trainer.image}
              alt={trainer.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FiUser className="text-gray-400 text-4xl" />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900">{trainer.fullName}</h3>
            <span className={`px-2 py-1 text-xs rounded-full 
              ${trainer.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {trainer.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{trainer.email}</p>

          <div className="mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <FiClock className="w-4 h-4 mr-1" />
              <span>{trainer.experience} years experience</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <FiAward className="w-4 h-4 mr-1" />
              <div className="flex items-center gap-1">
                <span>{trainer.rating}</span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-900">Specializations</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {trainer.specializations?.slice(0, 3).map((spec: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {spec}
                </span>
              ))}
              {trainer.specializations && trainer.specializations.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  +{trainer.specializations.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/gym/trainers/edit/${trainer._id}`);
              }}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 text-sm flex items-center justify-center gap-1"
            >
              <FiEdit2 size={14} />
              Edit
            </button>
            <button
              className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300 text-sm flex items-center justify-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(trainer._id);
              }}
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trainers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Trainer Management</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline'}
              onClick={() => setViewMode('table')}
              size="sm"
              className="flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'primary' : 'outline'}
              onClick={() => setViewMode('cards')}
              size="sm"
              className="flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Cards
            </Button>
            <Link to="/gym/trainers/add" className="ml-2">
              <Button size="sm" className="flex items-center gap-1">
                <FiPlus size={14} />
                New Trainer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {filteredTrainers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FiUser className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No trainers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search query.' : 'Create a new trainer to get started.'}
          </p>
          <div className="mt-6">
            <Link to="/gym/trainers/add">
              <Button className="flex items-center gap-1">
                <FiPlus size={16} />
                New Trainer
              </Button>
            </Link>
          </div>
        </div>
      ) : viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={tableData}
          className="border border-gray-200"
          rowClassName="hover:bg-gray-50"
          headerClassName="bg-gray-100"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer: TrainerType) => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTrainer?.fullName || 'Trainer Details'}
        size="lg"
      >
        {selectedTrainer && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="rounded-lg overflow-hidden bg-gray-100 h-64">
                  {selectedTrainer.image ? (
                    <img
                      src={selectedTrainer.image}
                      alt={selectedTrainer.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiUser className="text-gray-400 text-6xl" />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedTrainer.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedTrainer.experience} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-gray-900">{selectedTrainer.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Clients</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedTrainer.currentClients || 0}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1
                      ${selectedTrainer.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {selectedTrainer.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Specializations</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTrainer.specializations?.map((spec: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {selectedTrainer.bio && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedTrainer.bio}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
      onClick={handleEdit}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center gap-1"
    >
      <FiEdit2 size={14} />
      Edit Trainer
    </button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TrainersList;