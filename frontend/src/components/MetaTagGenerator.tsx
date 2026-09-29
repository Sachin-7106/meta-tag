import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileCode
} from 'lucide-react';
import { MetaTagInput, MetaTagOutput } from '../types';
import { generateMetaTagsApi } from '../api/client';
import { LivePreview } from './LivePreview';

interface MetaTagGeneratorProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const initialForm: MetaTagInput = {
  title: 'MetaForge - Automated DevOps Platform for Meta Tag Generator',
  description: 'Streamline your SEO meta tag generation while operating inside a production-grade automated CI/CD DevOps pipeline with Kubernetes, Docker, and Terraform.',
  url: 'https://metaforge.dev',
  image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  twitter_card_type: 'summary_large_image',
  site_name: 'MetaForge DevOps',
  author: 'DevOps Engineering Team',
  keywords: 'devops, meta tags, kubernetes, terraform, ci/cd, docker, fast api',
  robots: 'index, follow',
  theme_color: '#0f172a'
};

export const MetaTagGenerator: React.FC<MetaTagGeneratorProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<MetaTagInput>(initialForm);
  const [output, setOutput] = useState<MetaTagOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: keyof MetaTagInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await generateMetaTagsApi(formData);
      setOutput(res);
      onShowToast('HTML Meta Tags generated successfully!', 'success');
    } catch (err) {
      onShowToast('Failed to generate meta tags', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      image_url: '',
      twitter_card_type: 'summary_large_image',
      site_name: '',
      author: '',
      keywords: '',
      robots: 'index, follow',
      theme_color: '#0f172a'
    });
    setOutput(null);
    onShowToast('Generator form reset', 'info');
  };

  const handleCopy = () => {
    if (!output || !output.html) return;
    navigator.clipboard.writeText(output.html);
    setCopied(true);
    onShowToast('Meta tags HTML copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-sky-400" />
            <span>Automated Meta Tag Generator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate production-ready SEO, Open Graph, and Twitter metadata tags with real validation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Meta Tags'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Inputs (Left Column - 7 Cols) */}
        <form onSubmit={handleGenerate} className="lg:col-span-7 space-y-4 bg-slate-900 rounded-xl border border-slate-800 p-5">
          
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Webpage Information</span>
            <span className="text-[11px] font-mono text-slate-500 font-normal">Step 1: Fill Metadata</span>
          </h3>

          {/* Page Title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300">Page Title *</label>
              <span className={`text-[11px] font-mono ${
                formData.title.length > 60 ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {formData.title.length}/60 chars (Recommended: 50-60)
              </span>
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. MetaForge - Automated DevOps Platform"
              className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors font-sans"
              required
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300">Meta Description *</label>
              <span className={`text-[11px] font-mono ${
                formData.description.length > 160 ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {formData.description.length}/160 chars (Recommended: 150-160)
              </span>
            </div>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter compelling summary for search engine snippet..."
              className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors font-sans resize-none"
              required
            />
          </div>

          {/* Grid 2 Cols: Page URL & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Canonical Page URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Open Graph Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => handleInputChange('image_url', e.target.value)}
                placeholder="https://example.com/og-banner.png"
                className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Grid 2 Cols: Site Name & Twitter Card Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Site / Brand Name</label>
              <input
                type="text"
                value={formData.site_name}
                onChange={(e) => handleInputChange('site_name', e.target.value)}
                placeholder="MetaForge Platform"
                className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Twitter Card Type</label>
              <select
                value={formData.twitter_card_type}
                onChange={(e) => handleInputChange('twitter_card_type', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors"
              >
                <option value="summary_large_image">Summary Large Image (Recommended)</option>
                <option value="summary">Summary Card</option>
                <option value="app">App Card</option>
                <option value="player">Player Card</option>
              </select>
            </div>
          </div>

          {/* Advanced fields toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 focus:outline-none"
            >
              <span>{showAdvanced ? 'Hide Advanced SEO Fields' : '+ Show Advanced SEO Fields (Keywords, Author, Robots, Theme)'}</span>
            </button>
          </div>

          {showAdvanced && (
            <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="DevOps Team"
                    className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Robots Directives</label>
                  <input
                    type="text"
                    value={formData.robots}
                    onChange={(e) => handleInputChange('robots', e.target.value)}
                    placeholder="index, follow"
                    className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Comma-separated Keywords</label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="devops, kubernetes, terraform"
                    className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Theme Color Hex</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.theme_color || '#0f172a'}
                      onChange={(e) => handleInputChange('theme_color', e.target.value)}
                      className="w-8 h-8 rounded bg-transparent border border-slate-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.theme_color}
                      onChange={(e) => handleInputChange('theme_color', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-100 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Validation Warnings */}
          {output && output.validation_warnings.length > 0 && (
            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>SEO Validation Advisories ({output.validation_warnings.length}):</span>
              </div>
              <ul className="text-[11px] text-amber-200/80 list-disc list-inside space-y-0.5 pl-1">
                {output.validation_warnings.map((warn, idx) => (
                  <li key={idx}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

        </form>

        {/* Live Card Preview Column (Right - 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <LivePreview data={formData} />
        </div>

      </div>

      {/* Generated Code Output Area */}
      {output && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-3 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Generated HTML Meta Tags</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 rounded">
                {output.tag_count} Tags Generated
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all shadow-md shadow-emerald-900/30"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied HTML!' : 'Copy HTML'}</span>
            </button>
          </div>

          <div className="relative group">
            <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed max-h-96">
              <code>{output.html}</code>
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
