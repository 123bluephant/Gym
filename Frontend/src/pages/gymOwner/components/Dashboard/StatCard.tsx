import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo';
  compact?: boolean;
  loading?: boolean;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    iconBg: 'bg-blue-100',
    changeBg: 'bg-blue-50',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    iconBg: 'bg-green-100',
    changeBg: 'bg-green-50',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    iconBg: 'bg-red-100',
    changeBg: 'bg-red-50',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    iconBg: 'bg-purple-100',
    changeBg: 'bg-purple-50',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    iconBg: 'bg-orange-100',
    changeBg: 'bg-orange-50',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    changeBg: 'bg-indigo-50',
  },
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color, 
  compact = false,
  loading = false
}) => {
  const colors = colorClasses[color] || colorClasses.blue;

  if (loading) {
    return (
      <div className={`${colors.bg} p-4 rounded-lg shadow animate-pulse`}>
        <div className="flex justify-between">
          <div className="space-y-2 w-3/4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} p-4 rounded-lg shadow transition-all hover:shadow-md ${compact ? 'h-full' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${colors.text} truncate`}>{title}</p>
          <p className={`text-2xl font-bold text-gray-800 mt-1 mb-2 ${compact ? 'text-xl' : ''}`}>
            {value}
          </p>
          
          {change !== undefined && (
            <div className={`inline-flex items-center ${colors.changeBg} px-2 py-1 rounded-full`}>
              {change >= 0 ? (
                <FiTrendingUp className={`mr-1 ${colors.text}`} size={14} />
              ) : (
                <FiTrendingDown className="mr-1 text-red-500" size={14} />
              )}
              <span className={`text-xs font-medium ${change >= 0 ? colors.text : 'text-red-500'}`}>
                {Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'}
              </span>
            </div>
          )}
        </div>
        
        <div className={`${colors.iconBg} p-2 rounded-full flex-shrink-0 ml-2 ${compact ? 'h-8 w-8' : 'h-10 w-10'} flex items-center justify-center`}>
          {React.cloneElement(icon as React.ReactElement, {
            className: `${colors.text} ${compact ? 'text-base' : 'text-lg'}`
          })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;