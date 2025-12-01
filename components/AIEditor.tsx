import React, { useState, useRef } from 'react';
import { Wand2, Upload, Loader2, Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

export const AIEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extract base64 data without prefix for the API
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.substring(selectedImage.indexOf(':') + 1, selectedImage.indexOf(';'));
      
      const result = await editImageWithGemini(base64Data, prompt, mimeType);
      setGeneratedImage(result);
    } catch (err: any) {
      setError('خطا در پردازش تصویر. لطفا مجددا تلاش کنید.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Wand2 className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold">ویرایشگر هوشمند تصاویر</h2>
          </div>
          <p className="text-emerald-50 max-w-xl leading-relaxed">
            با استفاده از هوش مصنوعی Gemini 2.5، تصاویر خدمات خود را به سادگی ویرایش کنید. کافیست عکس را آپلود کرده و تغییرات مورد نظر را بنویسید.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">1</span>
            آپلود تصویر و دستور
          </h3>
          
          <div 
            onClick={triggerFileInput}
            className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer min-h-[300px] ${
              selectedImage ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
            }`}
          >
            {selectedImage ? (
              <div className="relative w-full h-full flex items-center justify-center">
                 <img src={selectedImage} alt="Preview" className="max-h-[300px] w-auto object-contain rounded-lg shadow-sm" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <span className="text-white font-medium flex items-center gap-2">
                      <Upload size={18} />
                      تغییر تصویر
                    </span>
                 </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <ImageIcon size={32} />
                </div>
                <p className="text-slate-600 font-medium mb-1">برای آپلود کلیک کنید</p>
                <p className="text-slate-400 text-sm">PNG, JPG تا 5MB</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">توضیحات ویرایش (دستور متنی)</label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثلا: 'پس زمینه را حذف کن' یا 'یک فیلتر قدیمی اضافه کن'..."
                className="w-full rounded-xl border border-slate-200 p-4 min-h-[100px] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700 resize-none transition-all"
              />
              <Sparkles className="absolute left-3 bottom-3 text-emerald-400 opacity-50" size={20} />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || isLoading}
              className={`w-full mt-4 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 ${
                !selectedImage || !prompt || isLoading 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 hover:bg-emerald-700 active:transform active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  در حال پردازش هوشمند...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  اعمال تغییرات
                </>
              )}
            </button>
            {error && (
              <p className="mt-3 text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">2</span>
            نتیجه پردازش
          </h3>
          
          <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center min-h-[400px] relative overflow-hidden">
            {isLoading ? (
               <div className="text-center p-8">
                 <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
                 <h4 className="text-lg font-bold text-slate-700 mb-2">هوش مصنوعی در حال تفکر</h4>
                 <p className="text-slate-500 text-sm">لطفا چند لحظه صبر کنید...</p>
               </div>
            ) : generatedImage ? (
              <div className="relative group w-full h-full flex items-center justify-center bg-checkered">
                <img src={generatedImage} alt="Generated" className="max-h-full max-w-full object-contain" />
                <a 
                  href={generatedImage} 
                  download="nobatify-edited.png"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-800 px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 hover:bg-emerald-50"
                >
                  <Download size={18} />
                  دانلود تصویر
                </a>
              </div>
            ) : (
              <div className="text-center text-slate-400 p-8">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ImageImageIcon size={32} className="opacity-50" />
                </div>
                <p>هنوز تصویری تولید نشده است</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for Icon inside conditional render to avoid variable conflict
const ImageImageIcon = ({size, className}: {size: number, className?: string}) => <ImageIcon size={size} className={className} />;
