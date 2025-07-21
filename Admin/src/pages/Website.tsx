import React, { useState } from 'react';
import { Monitor, Smartphone, Globe, Edit, Eye, Settings, Upload, Image } from 'lucide-react';

const Website: React.FC = () => {
  const [activeTab, setActiveTab] = useState('builder');

  const tabs = [
    { id: 'builder', name: 'Website Builder', icon: Monitor },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone },
    { id: 'seo', name: 'SEO Settings', icon: Globe },
    { id: 'content', name: 'Content Management', icon: Edit }
  ];

  const pages = [
    { name: 'Home', status: 'published', lastModified: '2024-01-20' },
    { name: 'About Us', status: 'published', lastModified: '2024-01-18' },
    { name: 'Classes', status: 'draft', lastModified: '2024-01-19' },
    { name: 'Membership', status: 'published', lastModified: '2024-01-15' },
    { name: 'Contact', status: 'published', lastModified: '2024-01-10' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Management</h1>
          <p className="text-gray-600 mt-1">Manage your gym's online presence</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview Site</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'builder' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Builder</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Pages</h4>
                  <div className="space-y-3">
                    {pages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{page.name}</div>
                          <div className="text-sm text-gray-500">Last modified: {new Date(page.lastModified).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                            {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-purple-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full p-4 text-left bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Edit className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Edit Homepage</div>
                          <div className="text-sm text-gray-600">Customize your main landing page</div>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-4 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                          <Image className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Update Gallery</div>
                          <div className="text-sm text-gray-600">Add new photos and videos</div>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-4 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Site Settings</div>
                          <div className="text-sm text-gray-600">Configure general settings</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mobile' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile App Management</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">App Status</h4>
                    <p className="text-sm text-blue-700">Your mobile app is live and available for download</p>
                    <div className="mt-3 flex space-x-2">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        iOS: Published
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Android: Published
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">App Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Class Booking</span>
                        <span className="text-xs text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Workout Tracking</span>
                        <span className="text-xs text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Push Notifications</span>
                        <span className="text-xs text-green-600">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">App Analytics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">2,847</div>
                      <div className="text-sm text-gray-600">Total Downloads</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">1,234</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">4.8</div>
                      <div className="text-sm text-gray-600">App Rating</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">89%</div>
                      <div className="text-sm text-gray-600">Retention Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                  <input
                    type="text"
                    defaultValue="FitFlow Gym - Premium Fitness Center"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={3}
                    defaultValue="Join FitFlow Gym for premium fitness equipment, expert trainers, and diverse classes. Transform your fitness journey today!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <input
                    type="text"
                    defaultValue="gym, fitness, workout, personal training, classes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">SEO Score</h4>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">85/100</div>
                      <div className="text-sm text-green-700">Good SEO optimization</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">✓ Meta description optimized</div>
                      <div className="text-sm text-gray-600">✓ Title tags present</div>
                      <div className="text-sm text-orange-600">⚠ Add more alt text to images</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Management</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Content</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">New Year Fitness Challenge</div>
                      <div className="text-sm text-gray-500">Blog post • Published 2 days ago</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">HIIT Class Schedule Update</div>
                      <div className="text-sm text-gray-500">Announcement • Published 1 week ago</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Nutrition Tips for Athletes</div>
                      <div className="text-sm text-gray-500">Blog post • Draft</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Content Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Blog Posts</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Published Pages</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Media Files</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Website;