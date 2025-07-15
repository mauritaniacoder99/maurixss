import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScannerPanel } from './components/ScannerPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { StatusBar } from './components/StatusBar';

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

function App() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [totalScanned, setTotalScanned] = useState(0);
  const [scanTime, setScanTime] = useState(0);

  // Demo vulnerabilities for demonstration
  const demoVulnerabilities: Vulnerability[] = [
    {
      id: '1',
      url: 'https://example.com/search?q=<script>alert("XSS")</script>',
      parameter: 'q',
      payload: '<script>alert("XSS")</script>',
      severity: 'high',
      aiVerified: true,
      timestamp: new Date()
    },
    {
      id: '2',
      url: 'https://example.com/profile?name="><img src=x onerror=alert("XSS")>',
      parameter: 'name',
      payload: '"><img src=x onerror=alert("XSS")>',
      severity: 'medium',
      aiVerified: true,
      timestamp: new Date()
    },
    {
      id: '3',
      url: 'https://example.com/page?data=%3Csvg%20onload=alert("XSS")%3E',
      parameter: 'data',
      payload: '<svg onload=alert("XSS")>',
      severity: 'high',
      aiVerified: false,
      timestamp: new Date()
    }
  ];

  // Timer effect for scan time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleScan = async (url: string, payloads: string[]) => {
    setIsScanning(true);
    setScanProgress(0);
    setTotalScanned(0);
    setScanTime(0);
    setVulnerabilities([]);

    // Simulate scanning process
    const totalTests = payloads.length;
    
    for (let i = 0; i < totalTests; i++) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      setScanProgress(Math.round(((i + 1) / totalTests) * 100));
      setTotalScanned(i + 1);
      
      // Randomly add vulnerabilities for demo (30% chance)
      if (Math.random() < 0.3 && i < demoVulnerabilities.length) {
        const vuln = { ...demoVulnerabilities[i] };
        vuln.url = url + '?param=' + encodeURIComponent(payloads[i]);
        vuln.payload = payloads[i];
        vuln.timestamp = new Date();
        
        setVulnerabilities(prev => [...prev, vuln]);
      }
    }

    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ScannerPanel onScan={handleScan} isScanning={isScanning} />
          </div>
          
          <div>
            <ResultsPanel 
              vulnerabilities={vulnerabilities}
              isScanning={isScanning}
              scanProgress={scanProgress}
            />
          </div>
        </div>
      </main>
      
      <StatusBar 
        isScanning={isScanning}
        totalScanned={totalScanned}
        vulnerabilitiesFound={vulnerabilities.length}
        scanTime={scanTime}
      />
    </div>
  );
}

export default App;