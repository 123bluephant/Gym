import React, { useState } from 'react';
import { Plus, Search, UserCheck, Star, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerManagement: React.FC = () => {
  const { trainers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000000]">Trainer Management</h2>
          <p className="text-[#D4A4C8]">Manage your gym trainers and their assignments</p>
        </div>
        <button className="bg-[#A856B2] hover:bg-[#D4A4C8] text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Trainer</span>
        </button>
      </div>

      <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#D4A4C8]">
        <div className="p-6 border-b border-[#D4A4C8]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#000000] h-4 w-4" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.id} className="bg-[#F4E1F0] rounded-lg p-6 hover:bg-[#D4A4C8] transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#D4A4C8] p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-[#FFFFFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#000000]">{trainer.name}</h3>
                  <p className="text-[#D4A4C8] text-sm">{trainer.email}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#000000]">Experience</span>
                  <span className="font-medium text-[#000000]">{trainer.experience} years</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#000000]">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[#A856B2] fill-current" />
                    <span className="ml-1 font-medium text-[#000000]">{trainer.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#000000]">Clients</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-[#D4A4C8] mr-1" />
                    <span className="font-medium text-[#000000]">{trainer.clients.length}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-[#000000] mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#A856B2] text-[#FFFFFF] text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-[#D4A4C8] mb-4 line-clamp-2">{trainer.bio}</p>

              <div className="flex items-center justify-between">
                <button className="text-[#A856B2] hover:text-[#D4A4C8] text-sm font-medium">
                  View Profile
                </button>
                <button className="text-[#A856B2] hover:text-[#D4A4C8] text-sm font-medium">
                  Assign Client
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <UserCheck className="h-12 w-12 text-[#D4A4C8] mx-auto mb-4" />
            <p className="text-[#D4A4C8]">No trainers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};