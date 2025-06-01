// my-robust-app-frontend/src/App.tsx

import React, { useState, useEffect } from 'react';
//import './App.css'; // Assuming you'll create this CSS file
import Greeting from './components/Greeting';

// Define an interface for the message data we expect from the backend
interface BackendMessage {
  id: number;
  content: string;
  timestamp: string;
  source: string;
}

function App() {
  const [backendMessage, setBackendMessage] = useState<BackendMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // This call will be proxied by Vite to http://localhost:3000/api/message
        const response = await fetch('/api/message'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BackendMessage = await response.json();
        setBackendMessage(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []); // Empty dependency array means this runs once on component mount

  return (
  <>
  
  <div className="App flex flex-col items-center justify-center p-10">
    <header className="App-header">
      <h1>ZEROUNO LANDING</h1>
      
      {loading && <p>Loading message from backend...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {backendMessage && (
        <p className="text-blue-600">
          <strong>Backend :</strong> {backendMessage.content} (Source: {backendMessage.source})
        </p>
      )}
    </header>
    
    <Greeting name="Dark" />
    <Greeting name="peponis" />
    <Greeting />
  </div>
  
    
    
        
      
</>   
  );
  
}

export default App;
