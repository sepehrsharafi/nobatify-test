import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { AIEditor } from './components/AIEditor';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'ai-editor':
        return <AIEditor />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Menu size={40} className="opacity-50" />
            </div>
            <h2 className="text-xl font-bold text-slate-600 mb-2">صفحه در دست ساخت</h2>
            <p>این بخش در بروزرسانی‌های بعدی اضافه خواهد شد.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-[Vazirmatn]">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Responsive Wrapper */}
      <div className={`fixed inset-y-0 right-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:mr-64 transition-all duration-300 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="جستجو..." 
                className="pr-10 pl-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all w-64 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-slate-100 hidden sm:block"></div>

            <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pl-3 rounded-xl transition-colors group">
              <img 
                src="https://picsum.photos/40/40" 
                alt="Profile" 
                className="w-9 h-9 rounded-lg object-cover ring-2 ring-transparent group-hover:ring-emerald-200 transition-all" 
              />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-700">مدیر سیستم</p>
                <p className="text-xs text-slate-400">admin@nobatify.ir</p>
              </div>
              <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {/* Breadcrumb / Title area could go here */}
          <div className="mb-6">
             <h1 className="text-2xl font-bold text-slate-800">
               {activeTab === 'dashboard' && 'داشبورد'}
               {activeTab === 'appointments' && 'نوبت‌ها'}
               {activeTab === 'employees' && 'کارمندان'}
               {activeTab === 'services' && 'لیست خدمات'}
               {activeTab === 'ai-editor' && 'ویرایشگر هوشمند'}
               {activeTab === 'profile' && 'پروفایل کاربری'}
             </h1>
             <p className="text-slate-400 text-sm mt-1">
               {activeTab === 'dashboard' && 'خلاصه وضعیت امروز فروشگاه شما'}
               {activeTab === 'ai-editor' && 'ابزار هوش مصنوعی برای ویرایش تصاویر'}
             </p>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}
