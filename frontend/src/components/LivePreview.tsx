import React, { useState } from 'react';
import { Search, Facebook, Twitter, Globe, Image as ImageIcon } from 'lucide-react';
import { MetaTagInput } from '../types';

interface LivePreviewProps {
  data: MetaTagInput;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'google' | 'facebook' | 'twitter'>('google');

  const title = data.title || 'Page Title Placeholder';
  const description = data.description || 'Provide a compelling page meta description to preview how your page snippet will appear in search results and social cards.';
  const url = data.url || 'https://example.com/article';
  const imageUrl = data.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
  const siteName = data.site_name || 'Site Name';

  // Format domain for SERP display
  let domain = 'example.com';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    domain = parsed.hostname;
  } catch (e) {
    domain = 'example.com';
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Live Web Card Preview</span>
        </h3>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('google')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'google' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google SERP</span>
          </button>
          <button
            onClick={() => setActiveTab('facebook')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'facebook' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook OG</span>
          </button>
          <button
            onClick={() => setActiveTab('twitter')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'twitter' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>Twitter Card</span>
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="min-h-[220px] flex items-center justify-center p-2">
        {activeTab === 'google' && (
          <div className="w-full max-w-xl bg-white text-slate-900 p-4 rounded-lg shadow-md font-sans space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                {domain.charAt(0).toUpperCase()}
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{siteName}</span>
                <span className="text-[11px] text-slate-500 truncate max-w-md">{url}</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-blue-800 hover:underline cursor-pointer truncate">
              {title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        )}

        {activeTab === 'facebook' && (
          <div className="w-full max-w-md bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-lg">
            <div className="relative aspect-[1.91/1] bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl}
                alt="Open Graph Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs gap-1 -z-0">
                <ImageIcon className="w-6 h-6 opacity-40" />
                <span>Image Preview</span>
              </div>
            </div>
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-slate-400 uppercase truncate tracking-wider">{domain}</div>
              <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">{title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-snug">{description}</p>
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div className="w-full max-w-md bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
            <div className="relative aspect-[2/1] bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl}
                alt="Twitter Card Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="p-3 bg-slate-950 space-y-1">
              <h4 className="text-sm font-medium text-slate-200 line-clamp-1">{title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{description}</p>
              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{domain}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
