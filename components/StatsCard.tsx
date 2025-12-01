import React from 'react';
import { StatCardProps } from '../types';

export const StatsCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend}
            <span>{trendUp ? '↑' : '↓'}</span>
          </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
      </div>
      <p className="text-slate-400 text-xs mt-2">{description}</p>
    </div>
  );
};
