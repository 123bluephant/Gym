import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

type Page = {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  status: 'published' | 'draft' | 'archived';
};

export const WebsitePages = () => {
  const pages: Page[] = [
    {
      id: '1',
      title: 'Homepage',
      slug: '/',
      lastUpdated: '2023-06-10',
      status: 'published'
    },
    {
      id: '2',
      title: 'About Us',
      slug: '/about',
      lastUpdated: '2023-05-15',
      status: 'published'
    },
    {
      id: '3',
      title: 'Membership Plans',
      slug: '/memberships',
      lastUpdated: '2023-06-05',
      status: 'published'
    },
    {
      id: '4',
      title: 'Summer Special',
      slug: '/summer-special',
      lastUpdated: '2023-06-18',
      status: 'draft'
    },
  ];

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md text-sm bg-indigo-100 text-indigo-700">
            All Pages
          </button>
          <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            Published
          </button>
          <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            Drafts
          </button>
        </div>
        <button className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">
          Add New Page
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {page.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {page.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {page.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[page.status]}`}>
                    {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <FiEdit />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 mr-3">
                    <FiEye />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};