import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AddUserModalProps {
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const { addUser, trainers } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'Basic' as 'Basic' | 'Premium' | 'VIP',
    trainerId: '',
    goals: [] as string[],
    medicalNotes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      goals: formData.goals.filter(goal => goal.trim() !== ''),
    });
    onClose();
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData({ ...formData, goals: newGoals });
  };

  const addGoal = () => {
    setFormData({ ...formData, goals: [...formData.goals, ''] });
  };

  const removeGoal = (index: number) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: newGoals });
  };

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFFFFF] rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#D4A4C8]">
          <div className="flex items-center space-x-3">
            <div className="bg-[#A856B2] p-2 rounded-lg">
              <User className="h-5 w-5 text-[#FFFFFF]" />
            </div>
            <h2 className="text-xl font-semibold text-[#000000]">Add New Member</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#D4A4C8] hover:text-[#A856B2] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                placeholder="Enter member's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Membership Type *
              </label>
              <select
                value={formData.membershipType}
                onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as any })}
                className="w-full px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
              >
                <option value="Basic">Basic - $30/month</option>
                <option value="Premium">Premium - $50/month</option>
                <option value="VIP">VIP - $80/month</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Assign Trainer (Optional)
              </label>
              <select
                value={formData.trainerId}
                onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
                className="w-full px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
              >
                <option value="">No trainer assigned</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name} - {trainer.specializations.join(', ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Fitness Goals
              </label>
              <div className="space-y-2">
                {formData.goals.map((goal, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                      placeholder="Enter fitness goal"
                    />
                    <button
                      type="button"
                      onClick={() => removeGoal(index)}
                      className="text-[#D4A4C8] hover:text-[#A856B2]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGoal}
                  className="text-[#A856B2] hover:text-[#D4A4C8] text-sm font-medium"
                >
                  + Add Goal
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Medical Notes (Optional)
              </label>
              <textarea
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                placeholder="Any medical conditions or notes..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-[#D4A4C8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#000000] bg-[#F4E1F0] hover:bg-[#D4A4C8] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#A856B2] hover:bg-[#D4A4C8] text-[#FFFFFF] rounded-lg transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};