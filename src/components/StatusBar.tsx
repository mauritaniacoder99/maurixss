import React from 'react';
import { Activity, Wifi, Shield, Clock } from 'lucide-react';

interface StatusBarProps {
  isScanning: boolean;
  totalScanned: number;
  vulnerabilitiesFound: number;
  scanTime: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isScanning,
  totalScanned,
  vulnerabilitiesFound,
  scanTime
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-6 py-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-gray-300">
              Status: {isScanning ? 'Scanning' : 'Ready'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            <Activity className="h-4 w-4" />
            <span>Scanned: {totalScanned}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Vulnerabilities: {vulnerabilitiesFound}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Time: {formatTime(scanTime)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <Wifi className="h-4 w-4" />
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
};