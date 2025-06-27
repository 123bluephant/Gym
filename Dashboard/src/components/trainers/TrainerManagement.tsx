import React, { useState } from 'react';
import { Plus, Search, UserCheck, Star, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Trainer {
  id: string;
  name: string;
  email: string;
  experience: number;
  rating: number;
  clients: any[];
  specializations: string[];
  bio: string;
  image?: string;
}

const TrainerAboutMe = ({ trainer }: { trainer: Trainer }) => {
  if (trainer.name === 'Mike Wilson') {
    return (
      <div className="space-y-3">
        <p>
          With a passion for fitness that spans over a decade, I'm Mike Wilson - your dedicated partner in achieving transformative health results. As an ACE-certified personal trainer and nutrition specialist, I bring a holistic approach to wellness.
        </p>
        
        <div className="space-y-2">
          <p className="font-semibold">My expertise includes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Strength & Conditioning: Tailored programs for all fitness levels</li>
            <li>Sports-Specific Training: Enhancing athletic performance</li>
            <li>Post-Rehabilitation: Safe recovery from injuries</li>
            <li>Metabolic Conditioning: Effective fat loss strategies</li>
            <li>Functional Movement: Improving daily life performance</li>
          </ul>
        </div>

        <p>
          I've successfully coached 500+ clients, from beginners to professional athletes, helping them achieve what they once thought impossible. My philosophy centers on education - I teach lifelong fitness skills.
        </p>

        <div className="space-y-2">
          <p className="font-semibold">When I'm not training clients:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Competing in natural bodybuilding shows</li>
            <li>Conducting fitness workshops</li>
            <li>Contributing to health publications</li>
            <li>Exploring new functional training methodologies</li>
          </ul>
        </div>

        <p className="font-semibold">
          Let's work together to build not just a better body, but a stronger, more confident you!
        </p>
      </div>
    );
  } else if (trainer.name === 'Lisa Chen') {
    return (
      <div className="space-y-3">
        <p>
          I'm Lisa Chen, a NASM-certified personal trainer and yoga instructor with 7 years of experience helping clients find balance between strength and flexibility. My approach combines Eastern mindfulness with Western exercise science.
        </p>
        
        <div className="space-y-2">
          <p className="font-semibold">My specialties include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Yoga & Mobility Training: For all skill levels</li>
            <li>Mind-Body Connection: Focused movement practices</li>
            <li>Pre/Postnatal Fitness: Safe exercises for mothers</li>
            <li>Corrective Exercise: Fixing muscular imbalances</li>
            <li>Meditation Techniques: For stress reduction</li>
          </ul>
        </div>

        <p>
          I've guided over 300 clients through transformative journeys, helping them develop sustainable practices that extend beyond the gym. My training philosophy emphasizes mindfulness in movement.
        </p>

        <div className="space-y-2">
          <p className="font-semibold">Outside of training:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Leading yoga retreats worldwide</li>
            <li>Studying traditional Chinese medicine</li>
            <li>Developing adaptive yoga programs</li>
            <li>Writing about holistic wellness</li>
          </ul>
        </div>

        <p className="font-semibold">
          Let me help you build strength with awareness and move with intention!
        </p>
      </div>
    );
  }
  return <p>{trainer.bio || 'No bio available.'}</p>;
};

const TrainerCard = ({ 
  trainer, 
  onViewDetails 
}: { 
  trainer: Trainer; 
  onViewDetails: (trainer: Trainer) => void 
}) => {
  return (
    <div className="bg-[#F4E1F0] rounded-lg p-6 hover:bg-[#D4A4C8] transition-colors">
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

      <p className="text-sm text-[#000000] mb-4 line-clamp-2">{trainer.bio}</p>

      <div className="flex items-center justify-between">
        <button
          className="text-[#A856B2] hover:text-[#000000] text-sm font-medium"
          onClick={() => onViewDetails(trainer)}
        >
          View Details
        </button>
        <button className="text-[#A856B2] hover:text-[#000000] text-sm font-medium">
          Assign Client
        </button>
      </div>
    </div>
  );
};

export const TrainerManagement: React.FC = () => {
  const { trainers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewDetails = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
  };

  const closeDetails = () => {
    setSelectedTrainer(null);
  };

  const defaultImageUrl = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000';

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
            <TrainerCard 
              key={trainer.id} 
              trainer={trainer} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <UserCheck className="h-12 w-12 text-[#D4A4C8] mx-auto mb-4" />
            <p className="text-[#D4A4C8]">No trainers found matching your search.</p>
          </div>
        )}
      </div>

      {selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <h2 className="text-3xl font-bold text-black mb-2">{selectedTrainer.name}</h2>
              <p className="text-lg text-black mb-4">Personal Trainer</p>
              <button
                className="absolute top-2 right-2 text-black hover:text-gray-700"
                onClick={closeDetails}
              >
                ✕
              </button>
            </div>
            
            <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
              <img
                src={selectedTrainer.image || defaultImageUrl}
                alt={selectedTrainer.name}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImageUrl; 
                }}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">About Me</h3>
              <div className="text-sm text-black space-y-3">
                <TrainerAboutMe trainer={selectedTrainer} />
              </div>
            </div>
            
            <button
              className="mt-4 bg-[#A856B2] hover:bg-[#D4A4C8] text-white px-4 py-2 rounded-lg w-full"
              onClick={closeDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};