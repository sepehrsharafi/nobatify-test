import React from 'react';
import { Users, CalendarCheck, Clock, TrendingUp, MoreHorizontal, CheckCircle2, Clock3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { StatsCard } from './StatsCard';
import { Appointment, RecentActivity } from '../types';

const weeklyData = [
  { name: 'شنبه', visits: 45 },
  { name: 'یک‌شنبه', visits: 52 },
  { name: 'دوشنبه', visits: 38 },
  { name: 'سه‌شنبه', visits: 65 },
  { name: 'چهارشنبه', visits: 48 },
  { name: 'پنج‌شنبه', visits: 60 },
  { name: 'جمعه', visits: 25 },
];

const mockAppointments: Appointment[] = [
  { id: '1', customerName: 'علی احمدی', service: 'اصلاح مو', employee: 'رضا محمدی', time: '10:00', status: 'confirmed', avatar: 'https://picsum.photos/40/40?random=1' },
  { id: '2', customerName: 'سارا کریمی', service: 'رنگ مو', employee: 'زهرا یوسفی', time: '11:30', status: 'pending', avatar: 'https://picsum.photos/40/40?random=2' },
  { id: '3', customerName: 'حسین رضایی', service: 'اصلاح ریش', employee: 'رضا محمدی', time: '14:00', status: 'confirmed', avatar: 'https://picsum.photos/40/40?random=3' },
  { id: '4', customerName: 'مریم اکبری', service: 'مانیکور', employee: 'نازنین فتحی', time: '15:15', status: 'cancelled', avatar: 'https://picsum.photos/40/40?random=4' },
];

const mockActivity: RecentActivity[] = [
  { id: '1', description: 'نوبت جدید توسط علی احمدی ثبت شد', timeAgo: '5 دقیقه پیش', type: 'appointment' },
  { id: '2', description: 'خدمت جدید به بخش خدمات اضافه شد', timeAgo: '1 ساعت پیش', type: 'system' },
  { id: '3', description: 'کارمند جدید به تیم اضافه شد', timeAgo: '2 ساعت پیش', type: 'employee' },
  { id: '4', description: 'وضعیت نوبت سارا کریمی تغییر کرد', timeAgo: '3 ساعت پیش', type: 'appointment' },
];

export const DashboardContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="نوبت‌های امروز" 
          value="24" 
          icon={<CalendarCheck size={24} />} 
          trend="12%" 
          trendUp={true} 
          description="نسبت به روز گذشته"
        />
        <StatsCard 
          title="مشتریان" 
          value="345" 
          icon={<Users size={24} />} 
          trend="5%" 
          trendUp={true} 
          description="مشتریان فعال ماه جاری"
        />
        <StatsCard 
          title="درآمد امروز" 
          value="4.5M" 
          icon={<TrendingUp size={24} />} 
          trend="2%" 
          trendUp={false} 
          description="تومان"
        />
        <StatsCard 
          title="کارمندان فعال" 
          value="8" 
          icon={<Clock size={24} />} 
          description="در حال حاضر در شیفت"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">آمار هفتگی نوبت‌ها</h2>
            <select className="bg-slate-50 border-none text-sm text-slate-600 rounded-lg p-2 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>هفته جاری</option>
              <option>هفته گذشته</option>
            </select>
          </div>
          <div className="h-[300px] w-full dir-ltr" style={{ direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">فعالیت‌های اخیر</h2>
          <div className="space-y-6">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${
                    activity.type === 'appointment' ? 'bg-emerald-400' :
                    activity.type === 'system' ? 'bg-blue-400' : 'bg-orange-400'
                  }`} />
                  <div className="w-0.5 h-full bg-slate-100 absolute top-4 -z-10" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors">
            مشاهده همه فعالیت‌ها
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">نوبت‌های امروز</h2>
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">مدیریت همه</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-xs font-medium">
              <tr>
                <th className="px-6 py-4 rounded-tr-xl">مشتری</th>
                <th className="px-6 py-4">خدمت</th>
                <th className="px-6 py-4">کارمند</th>
                <th className="px-6 py-4">زمان</th>
                <th className="px-6 py-4">وضعیت</th>
                <th className="px-6 py-4 rounded-tl-xl"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={apt.avatar} alt={apt.customerName} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-medium text-slate-700">{apt.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{apt.service}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{apt.employee}</td>
                  <td className="px-6 py-4 font-mono text-slate-600 text-sm dir-ltr text-right">{apt.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      apt.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status === 'confirmed' && <CheckCircle2 size={12} />}
                      {apt.status === 'pending' && <Clock3 size={12} />}
                      {apt.status === 'confirmed' ? 'تایید شده' : apt.status === 'pending' ? 'در انتظار' : 'لغو شده'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
