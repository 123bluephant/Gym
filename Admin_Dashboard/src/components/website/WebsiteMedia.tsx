import { FiImage, FiDownload, FiTrash2, FiFileText } from 'react-icons/fi';

type MediaItem = {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploaded: string;
  dimensions?: string;
};

export const WebsiteMedia = () => {
  const media: MediaItem[] = [
    {
      id: '1',
      name: 'gym-hero.jpg',
      type: 'image',
      size: '2.4 MB',
      uploaded: '2023-06-10',
      dimensions: '1920x1080'
    },
    {
      id: '2',
      name: 'trainer-profile.png',
      type: 'image',
      size: '1.8 MB',
      uploaded: '2023-05-15',
      dimensions: '800x800'
    },
    {
      id: '3',
      name: 'membership-benefits.pdf',
      type: 'document',
      size: '4.2 MB',
      uploaded: '2023-06-05'
    },
    {
      id: '4',
      name: 'gym-tour.mp4',
      type: 'video',
      size: '15.7 MB',
      uploaded: '2023-06-18'
    },
  ];

  const typeIcons = {
    image: <FiImage className="h-5 w-5 text-indigo-600" />,
    video: <FiImage className="h-5 w-5 text-red-600" />,
    document: <FiFileText className="h-5 w-5 text-yellow-600" />,
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md text-sm bg-indigo-100 text-indigo-700">
            All Media
          </button>
          <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            Images
          </button>
          <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            Videos
          </button>
        </div>
        <button className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">
          Upload Media
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 h-40 flex items-center justify-center">
              {typeIcons[item.type]}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{item.size}</span>
                <span>{item.uploaded}</span>
              </div>
              {item.dimensions && (
                <div className="text-xs text-gray-500 mt-1">
                  {item.dimensions}
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-2">
                <button className="text-gray-600 hover:text-gray-900">
                  <FiDownload />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};