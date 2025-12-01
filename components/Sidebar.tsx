import React from 'react';
import { LayoutDashboard, Calendar, Users, Briefcase, User, Wand2, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
    { id: 'appointments', label: 'نوبت‌ها', icon: <Calendar size={20} /> },
    { id: 'employees', label: 'کارمندان', icon: <Users size={20} /> },
    { id: 'services', label: 'خدمات', icon: <Briefcase size={20} /> },
    { id: 'ai-editor', label: 'ویرایشگر هوشمند', icon: <Wand2 size={20} /> }, // AI Feature
    { id: 'profile', label: 'پروفایل', icon: <User size={20} /> },
  ];

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-200 shadow-sm hidden md:flex flex-col transition-all duration-300">
      <div className="h-20 flex items-center justify-center border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
            N
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">نوتیفای</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              activeTab === item.id
                ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
};
