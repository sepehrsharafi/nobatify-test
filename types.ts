import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  description: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  service: string;
  employee: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  avatar: string;
}

export interface RecentActivity {
  id: string;
  description: string;
  timeAgo: string;
  type: 'appointment' | 'system' | 'employee';
}

export interface ChartData {
  name: string;
  value: number;
}