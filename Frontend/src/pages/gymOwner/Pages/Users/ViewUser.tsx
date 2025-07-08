// src/pages/Users/View.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit, FiArrowLeft, FiCalendar, FiMail, FiPhone, FiUser, FiActivity } from 'react-icons/fi';
import { User } from '../../types/gymTypes';

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUsers = localStorage.getItem('gymUsers');
        if (savedUsers) {
          const users: User[] = JSON.parse(savedUsers);
          const foundUser = users.find(u => u.id === id);
          setUser(foundUser || null);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 w-full bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-800 mb-4">User not found</h3>
          <p className="text-gray-600 mb-6">The requested user could not be found in our records.</p>
          <button
            onClick={() => navigate('/gym/members')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <FiArrowLeft /> Back to Users
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Expired':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">User Details</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/gym/members')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft /> Back
          </button>
          <button
            onClick={() => navigate(`/gym/members/edit/${user.id}`)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FiEdit /> Edit
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* User Profile Section */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FiUser className="text-gray-600 text-5xl" />
              </div>
              <h2 className="text-xl font-bold text-center">{user.name}</h2>
              <span className={getStatusBadge(user.status)}>{user.status}</span>
              
              <div className="mt-6 w-full space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMail className="text-gray-400" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiPhone className="text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <FiCalendar className="text-gray-400" />
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <FiActivity className="text-blue-500" /> Membership Details
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Membership Type</dt>
                      <dd className="font-medium">{user.membershipType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Status</dt>
                      <dd>
                        <span className={getStatusBadge(user.status)}>
                          {user.status}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Member Since</dt>
                      <dd className="font-medium">{formatDate(user.joinDate)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3">Activity</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Last Check-In</dt>
                      <dd className="font-medium">
                        {user.lastCheckIn ? formatDate(user.lastCheckIn) : 'Never'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Total Visits</dt>
                      <dd className="font-medium">
                        {user.visits ? user.visits.length : '0'} sessions
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Additional sections can be added here */}
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3">Notes</h3>
                  {user.notes ? (
                    <p className="text-gray-700">{user.notes}</p>
                  ) : (
                    <p className="text-gray-400 italic">No notes available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => navigate(`/gym/members/edit/${user.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;