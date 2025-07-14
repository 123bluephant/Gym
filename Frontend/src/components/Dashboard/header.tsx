import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 p-4 z-20 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">FitFlow</h1>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;