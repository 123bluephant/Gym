import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { Menu } from 'lucide-react';

const ResponsivePageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          className="fixed top-4 left-4 z-20 p-2 rounded-md bg-indigo-600 text-white md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div className={`fixed h-full z-10 transform ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isMobile ? 'pl-16' : 'md:ml-64'}`}>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsivePageLayout;