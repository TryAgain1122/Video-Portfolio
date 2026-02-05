'use client';

import React from 'react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
  delay: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color, delay }) => {
  return (
    <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: delay }}>
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
};