import React from 'react';
import { Shield, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MauriXSS</h1>
              <p className="text-sm text-gray-400">Advanced XSS Vulnerability Scanner</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <User className="h-5 w-5" />
            <span className="text-sm">Mauritania Injector</span>
          </div>
        </div>
      </div>
    </header>
  );
};