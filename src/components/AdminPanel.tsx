import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { translations, Language } from '../lib/i18n';

interface AdminPanelProps {
  currentLang: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'messages' | 'profile' | 'content'>('messages');
  const [messages, setMessages] = useState<any[]>([]);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Content state
  const [customContent, setCustomContent] = useState<any>({});
  
  useEffect(() => {
    fetchMessages();
    fetchSiteContent();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const fetchSiteContent = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*');
    if (data) {
      const profileInfo = data.find(d => d.section_key === 'profile');
      if (profileInfo && profileInfo.content?.image_url) {
        setProfileUrl(profileInfo.content.image_url);
      }
      
      const transInfo = data.find(d => d.section_key === 'translations');
      if (transInfo && transInfo.content) {
        setCustomContent(transInfo.content);
      }
    }
    setLoading(false);
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const uploadProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const url = await uploadImageToSupabase(event.target.files[0]);
      setProfileUrl(url);
      await supabase.from('site_content').upsert({
        section_key: 'profile',
        content: { image_url: url }
      });
      alert('Profile picture updated!');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const getSectionItems = (section: string) => {
    return customContent?.[currentLang]?.[section]?.items !== undefined
      ? customContent[currentLang][section].items
      : (translations[currentLang] as any)?.[section]?.items || [];
  };

  const updateSectionItems = (section: string, newItems: any[]) => {
    setCustomContent((prev: any) => ({
      ...prev,
      [currentLang]: {
        ...(prev[currentLang] || {}),
        [section]: {
          ...(prev[currentLang]?.[section] || (translations[currentLang] as any)[section]),
          items: newItems
        }
      }
    }));
  };

  const updateItemField = (section: string, index: number, field: string, value: any) => {
    const items = [...getSectionItems(section)];
    items[index] = { ...items[index], [field]: value };
    updateSectionItems(section, items);
  };

  const addItem = (section: string, defaultItem: any) => {
    updateSectionItems(section, [...getSectionItems(section), defaultItem]);
  };

  const removeItem = (section: string, index: number) => {
    const items = getSectionItems(section).filter((_: any, i: number) => i !== index);
    updateSectionItems(section, items);
  };

  const handleItemImageUpload = async (section: string, index: number, field: string, file: File) => {
    try {
       const url = await uploadImageToSupabase(file);
       updateItemField(section, index, field, url);
    } catch (e: any) {
       alert('Upload failed: ' + e.message);
    }
  };

  const saveContent = async () => {
    try {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'translations',
        content: customContent
      });
      if (error) throw error;
      alert('Content saved successfully!');
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (!error) {
      setMessages(messages.filter(m => m.id !== id));
    } else {
      alert('Failed to delete message.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 rounded-2xl p-6 md:p-8 border border-primary-100 flex flex-col md:flex-row gap-6 justify-between items-center neo-shadow">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h3>
          <p className="text-gray-500 max-w-xl">
            You must run the setup.sql script in your Supabase SQL Editor before these work! (Check /setup.sql file)
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2 rtl:space-x-reverse mb-6">
        <button onClick={() => setActiveTab('messages')} className={`px-4 py-2 rounded-lg font-bold border ${activeTab === 'messages' ? 'bg-primary-600 text-white border-primary-600' : 'bg-transparent text-gray-600 border-gray-300'}`}>Messages</button>
        <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-lg font-bold border ${activeTab === 'profile' ? 'bg-primary-600 text-white border-primary-600' : 'bg-transparent text-gray-600 border-gray-300'}`}>Profile Setup</button>
        <button onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-lg font-bold border ${activeTab === 'content' ? 'bg-primary-600 text-white border-primary-600' : 'bg-transparent text-gray-600 border-gray-300'}`}>Edit Content</button>
      </div>

      {activeTab === 'messages' && (
        <div className="bg-[#ecf0f3] neo-shadow-inner rounded-2xl p-6 md:p-8 overflow-x-auto">
          <h3 className="text-xl font-bold mb-6">Recent Messages</h3>
          <div className="min-w-[600px] space-y-4">
            {messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : messages.map(msg => (
              <div key={msg.id} className="bg-white/50 p-5 rounded-xl transition-colors relative group border border-transparent hover:border-red-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-gray-800">{msg.name}</div>
                    <div className="text-sm text-gray-500">{msg.email}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700 mt-2 whitespace-pre-wrap">{msg.message}</p>
                <button 
                  onClick={() => deleteMessage(msg.id)}
                  className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:bg-red-50 px-2 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-[#ecf0f3] neo-shadow-inner rounded-2xl p-6 md:p-8">
           <h3 className="text-xl font-bold mb-6">Profile Image</h3>
           <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div className="w-32 h-32 rounded-full overflow-hidden neo-shadow bg-gray-200 shrink-0">
                 {profileUrl ? (
                   <img src={profileUrl} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                 )}
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Upload New Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={uploadProfileImage}
                      disabled={uploading}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                 </div>
                 {uploading && <div className="text-sm text-blue-500">Uploading...</div>}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="bg-[#ecf0f3] neo-shadow-inner rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold mb-4">Edit Hero Section ({currentLang.toUpperCase()})</h3>
          
          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                  <input 
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" 
                    value={customContent?.[currentLang]?.hero?.name !== undefined ? customContent[currentLang].hero.name : translations[currentLang].hero.name} 
                    onChange={e => setCustomContent((prev: any) => ({ ...prev, [currentLang]: { ...(prev[currentLang] || {}), hero: { ...(prev[currentLang]?.hero || translations[currentLang].hero), name: e.target.value } } }))} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                  <input 
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" 
                    value={customContent?.[currentLang]?.hero?.title !== undefined ? customContent[currentLang].hero.title : translations[currentLang].hero.title} 
                    onChange={e => setCustomContent((prev: any) => ({ ...prev, [currentLang]: { ...(prev[currentLang] || {}), hero: { ...(prev[currentLang]?.hero || translations[currentLang].hero), title: e.target.value } } }))} 
                  />
                </div>
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" 
                  rows={2}
                  value={customContent?.[currentLang]?.hero?.tagline !== undefined ? customContent[currentLang].hero.tagline : translations[currentLang].hero.tagline} 
                  onChange={e => setCustomContent((prev: any) => ({ ...prev, [currentLang]: { ...(prev[currentLang] || {}), hero: { ...(prev[currentLang]?.hero || translations[currentLang].hero), tagline: e.target.value } } }))} 
                />
             </div>
          </div>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">About Me</h3>
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Biography</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" 
                  rows={4}
                  value={customContent?.[currentLang]?.about?.bio !== undefined ? customContent[currentLang].about.bio : translations[currentLang].about.bio} 
                  onChange={e => setCustomContent((prev: any) => ({ ...prev, [currentLang]: { ...(prev[currentLang] || {}), about: { ...(prev[currentLang]?.about || translations[currentLang].about), bio: e.target.value } } }))} 
                />
             </div>
          </div>

          <p className="text-sm text-gray-500">More sections can be added here. Currently supporting Hero and About.</p>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">Services Sections (What I Do / Branding)</h3>
          <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-gray-200">
             {getSectionItems('services').map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 relative pr-8">
                   <input className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Title" value={item.title || ''} onChange={e => updateItemField('services', idx, 'title', e.target.value)} />
                   <textarea className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" rows={2} placeholder="Description" value={item.description || ''} onChange={e => updateItemField('services', idx, 'description', e.target.value)} />
                   <button onClick={() => removeItem('services', idx)} className="text-red-500 absolute top-2 right-0 font-bold hover:text-red-700">X</button>
                </div>
             ))}
             <button onClick={() => addItem('services', {title: '', description: ''})} className="text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100">+ Add Service</button>
          </div>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">Books</h3>
          <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-gray-200">
             {getSectionItems('books').map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 relative pr-8 flex flex-col md:flex-row gap-4 items-start">
                   <div className="w-24 h-32 bg-gray-200 rounded-lg shrink-0 overflow-hidden relative group">
                      {item.image_url ? (
                         <img src={item.image_url} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 text-center p-2">No Image</div>
                      )}
                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files?.[0] && handleItemImageUpload('books', idx, 'image_url', e.target.files[0])} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] text-center p-1 pointer-events-none opacity-0 group-hover:opacity-100">Upload</div>
                   </div>
                   <div className="flex-1 space-y-2 w-full">
                      <input className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Book Title" value={item.title || ''} onChange={e => updateItemField('books', idx, 'title', e.target.value)} />
                      <textarea className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" rows={3} placeholder="Short Description / Content" value={item.description || item.status || ''} onChange={e => updateItemField('books', idx, 'description', e.target.value)} />
                   </div>
                   <button onClick={() => removeItem('books', idx)} className="text-red-500 absolute top-2 right-0 font-bold hover:text-red-700">X</button>
                </div>
             ))}
             <button onClick={() => addItem('books', {title: '', description: '', image_url: ''})} className="text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100">+ Add Book</button>
          </div>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">Consulting Packages</h3>
          <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-gray-200">
             {getSectionItems('consulting').map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 relative pr-8">
                   <div className="flex gap-2">
                       <input className="flex-1 px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Package Title" value={item.title || ''} onChange={e => updateItemField('consulting', idx, 'title', e.target.value)} />
                       <input className="w-32 px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Price (e.g. $100)" value={item.price || ''} onChange={e => updateItemField('consulting', idx, 'price', e.target.value)} />
                   </div>
                   <textarea 
                     className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 font-mono text-sm leading-relaxed" 
                     rows={4} 
                     placeholder="Features (one per line)" 
                     value={(item.features || []).join('\n')} 
                     onChange={e => updateItemField('consulting', idx, 'features', e.target.value.split('\n'))} 
                   />
                   <button onClick={() => removeItem('consulting', idx)} className="text-red-500 absolute top-2 right-0 font-bold hover:text-red-700">X</button>
                </div>
             ))}
             <button onClick={() => addItem('consulting', {title: '', price: '', features: ['Included feature']})} className="text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100">+ Add Package</button>
          </div>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">FAQ (Questions & Answers)</h3>
          <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-gray-200">
             {getSectionItems('faq').map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 relative pr-8">
                   <input className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Question" value={item.question || ''} onChange={e => updateItemField('faq', idx, 'question', e.target.value)} />
                   <textarea className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" rows={2} placeholder="Answer" value={item.answer || ''} onChange={e => updateItemField('faq', idx, 'answer', e.target.value)} />
                   <button onClick={() => removeItem('faq', idx)} className="text-red-500 absolute top-2 right-0 font-bold hover:text-red-700">X</button>
                </div>
             ))}
             <button onClick={() => addItem('faq', {question: '', answer: ''})} className="text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100">+ Add FAQ</button>
          </div>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">Certificates</h3>
          <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-gray-200">
             {getSectionItems('certificates').map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 relative pr-8 flex flex-col md:flex-row gap-4 items-start">
                   <div className="w-32 h-24 bg-gray-200 rounded-lg shrink-0 overflow-hidden relative group">
                      {item.image_url ? (
                         <img src={item.image_url} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 text-center p-2">No Image</div>
                      )}
                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files?.[0] && handleItemImageUpload('certificates', idx, 'image_url', e.target.files[0])} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] text-center p-1 pointer-events-none opacity-0 group-hover:opacity-100">Upload</div>
                   </div>
                   <div className="flex-1 space-y-2 w-full">
                      <input className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Certificate Title" value={item.title || ''} onChange={e => updateItemField('certificates', idx, 'title', e.target.value)} />
                      <input className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" placeholder="Year / Optional Description" value={item.year || item.issuer || ''} onChange={e => updateItemField('certificates', idx, 'year', e.target.value)} />
                   </div>
                   <button onClick={() => removeItem('certificates', idx)} className="text-red-500 absolute top-2 right-0 font-bold hover:text-red-700">X</button>
                </div>
             ))}
             <button onClick={() => addItem('certificates', {title: '', image_url: '', year: ''})} className="text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100">+ Add Certificate</button>
          </div>

          <h3 className="text-xl font-bold mb-4 pt-6 border-t border-gray-200">Contact / Information Links</h3>
          <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-gray-200">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Instagram Link</label>
                <input 
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" 
                  placeholder="https://instagram.com/yourprofile"
                  value={customContent?.[currentLang]?.contact?.links?.instagram || ''} 
                  onChange={e => setCustomContent((prev: any) => ({ ...prev, [currentLang]: { ...(prev[currentLang] || {}), contact: { ...(prev[currentLang]?.contact || translations[currentLang].contact), links: { ...(prev[currentLang]?.contact?.links || {}), instagram: e.target.value } } } }))} 
                />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Telegram Link</label>
                <input 
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200" 
                  placeholder="https://t.me/yourusername"
                  value={customContent?.[currentLang]?.contact?.links?.telegram || ''} 
                  onChange={e => setCustomContent((prev: any) => ({ ...prev, [currentLang]: { ...(prev[currentLang] || {}), contact: { ...(prev[currentLang]?.contact || translations[currentLang].contact), links: { ...(prev[currentLang]?.contact?.links || {}), telegram: e.target.value } } } }))} 
                />
             </div>
          </div>

          <button 
            onClick={saveContent}
            className="mt-6 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition"
          >
            Save Content Changes
          </button>
        </div>
      )}
    </div>
  );
};
