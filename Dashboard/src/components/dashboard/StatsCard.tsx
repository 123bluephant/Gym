import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color: string;
}

const colorClasses = {
  '[#A856B2]': 'bg-[#F4E1F0] text-[#A856B2] border-[#D4A4C8]',
  '[#D4A4C8]': 'bg-[#F4E1F0] text-[#D4A4C8] border-[#D4A4C8]',
  '[#F4E1F0]': 'bg-[#F4E1F0] text-[#A856B2] border-[#D4A4C8]',
};

const changeColors = {
  increase: 'text-[#A856B2]',
  decrease: 'text-[#D4A4C8]',
  neutral: 'text-[#000000]',
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
}) => {
  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#000000] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#000000]">{title}</p>
          <p className="text-2xl font-bold text-[#000000] mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};