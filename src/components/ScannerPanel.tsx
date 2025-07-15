import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, Upload } from 'lucide-react';

interface ScannerPanelProps {
  onScan: (url: string, payloads: string[]) => void;
  isScanning: boolean;
}

export const ScannerPanel: React.FC<ScannerPanelProps> = ({ onScan, isScanning }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [customPayloads, setCustomPayloads] = useState('');
  const [useAI, setUseAI] = useState(true);
  const [threads, setThreads] = useState(10);

  const defaultPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg onload=alert("XSS")>',
    '"><script>alert("XSS")</script>',
    '\';alert("XSS");//',
    'javascript:alert("XSS")',
    '<iframe src="javascript:alert(`XSS`)"></iframe>',
    '<body onload=alert("XSS")>'
  ];

  const handleScan = () => {
    if (!targetUrl.trim()) return;
    
    const payloads = customPayloads.trim() 
      ? customPayloads.split('\n').filter(p => p.trim())
      : defaultPayloads;
    
    onScan(targetUrl, payloads);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Settings className="h-5 w-5 mr-2 text-green-400" />
          Scan Configuration
        </h2>
      </div>

      <div className="space-y-6">
        {/* Target URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target URL
          </label>
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com/search?q=test"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200"
          />
        </div>

        {/* Scan Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Threads
            </label>
            <select
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200"
            >
              <option value={5}>5 Threads</option>
              <option value={10}>10 Threads</option>
              <option value={20}>20 Threads</option>
              <option value={50}>50 Threads</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4 pt-8">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
                className="w-4 h-4 text-green-400 bg-gray-900 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
              />
              <span>AI Verification</span>
            </label>
          </div>
        </div>

        {/* Custom Payloads */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Custom Payloads (one per line)
            </label>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
              <Upload className="h-3 w-3 mr-1" />
              Load from file
            </button>
          </div>
          <textarea
            value={customPayloads}
            onChange={(e) => setCustomPayloads(e.target.value)}
            placeholder="Leave empty to use default payloads..."
            rows={6}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 font-mono text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleScan}
            disabled={isScanning || !targetUrl.trim()}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start Scan
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              setTargetUrl('');
              setCustomPayloads('');
            }}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};