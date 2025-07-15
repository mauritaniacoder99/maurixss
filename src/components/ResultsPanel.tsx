import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react';

interface Vulnerability {
  id: string;
  url: string;
  parameter: string;
  payload: string;
  severity: 'high' | 'medium' | 'low';
  aiVerified: boolean;
  timestamp: Date;
  response?: string;
}

interface ResultsPanelProps {
  vulnerabilities: Vulnerability[];
  isScanning: boolean;
  scanProgress: number;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  vulnerabilities, 
  isScanning, 
  scanProgress 
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
          Scan Results
        </h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
            <span>Scan Progress</span>
            <span>{scanProgress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-red-400">
            {vulnerabilities.filter(v => v.severity === 'high').length}
          </div>
          <div className="text-sm text-gray-400">High Risk</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">
            {vulnerabilities.filter(v => v.severity === 'medium').length}
          </div>
          <div className="text-sm text-gray-400">Medium Risk</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">
            {vulnerabilities.filter(v => v.severity === 'low').length}
          </div>
          <div className="text-sm text-gray-400">Low Risk</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-green-400">
            {vulnerabilities.filter(v => v.aiVerified).length}
          </div>
          <div className="text-sm text-gray-400">AI Verified</div>
        </div>
      </div>

      {/* Vulnerabilities List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {vulnerabilities.length === 0 && !isScanning && (
          <div className="text-center py-12 text-gray-400">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No vulnerabilities found yet. Start a scan to begin.</p>
          </div>
        )}

        {vulnerabilities.map((vuln) => (
          <div key={vuln.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(vuln.severity)}`}>
                  {getSeverityIcon(vuln.severity)}
                  <span className="ml-1 uppercase">{vuln.severity}</span>
                </span>
                {vuln.aiVerified && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-300 bg-green-900/20 border border-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    AI Verified
                  </span>
                )}
              </div>
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                <Eye className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">URL:</span>
                <p className="text-sm text-white font-mono break-all">{vuln.url}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Parameter:</span>
                <p className="text-sm text-blue-300 font-mono">{vuln.parameter}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Payload:</span>
                <p className="text-sm text-gray-300 font-mono bg-gray-800 p-2 rounded border border-gray-600 break-all">
                  {vuln.payload}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                Discovered: {vuln.timestamp.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};