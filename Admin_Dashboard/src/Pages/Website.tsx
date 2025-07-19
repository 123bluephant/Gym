// pages/Website.tsx
import { Card } from '../components/ui/Card';
import { FiEdit, FiImage, FiFileText, FiSettings } from 'react-icons/fi';
import { WebsitePages } from '../components/website/WebsitePages';
import { WebsiteMedia } from '../components/website/WebsiteMedia';
import { useState } from 'react';

export const Website = () => {
  const [activeTab, setActiveTab] = useState('pages');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Website Content</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center">
            <FiSettings className="mr-2" /> Site Settings
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pages')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pages' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiFileText className="inline mr-2" />
            Pages
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'blog' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiFileText className="inline mr-2" />
            Blog
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'media' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiImage className="inline mr-2" />
            Media
          </button>
        </nav>
      </div>

      <Card>
        <div className="p-4">
          {activeTab === 'pages' && <WebsitePages />}
          {activeTab === 'blog' && <div>Blog content management</div>}
          {activeTab === 'media' && <WebsiteMedia />}
        </div>
      </Card>
    </div>
  );
};