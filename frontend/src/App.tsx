// my-robust-app-frontend/src/App.tsx
import  { useState, useEffect } from 'react';
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
  <div className="min-h-screen items-center flex flex-col">
  <header className="App-header py-10 h-[33vh] flex items-center justify-center">
    <div className='mx-auto'>
      <h1 className="text-center text-[clamp(4.7rem,8vw,7rem)]">ZEROUNO</h1>
      <div className="flex justify-center items-center gap-2">
        <h2 className="text-center text-[clamp(1.8rem,3vw,2rem)] inline-block">SOLUCIONES</h2>
        <h2 className="text-center text-[clamp(1.8rem,3vw,2rem)] inline-block">INFORMATICAS</h2>
      </div>
      {loading && <p>Loading message from backend...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {backendMessage && (
        <p className="text-blue-600 py-5">
          <strong>Backend :</strong> {backendMessage.content} (Source: {backendMessage.source})
        </p>
      )}
    </div>
    
    
    
  </header>
  <div className="App flex flex-col items-center justify-center flex-1">
    
    <div className='py-5'>
      <Greeting name="Aplicaciones WEB" />
      <Greeting name="Sistemas en la Nube AWS y Google" />
      <Greeting name="Landing Page LOW COST" />
    </div>
    
  </div>
  
  <footer className="App-footer text-center py-5">
    <p>Powered by ZEROUNO</p>
  </footer>
    
  </div>
      
</>   
  );
  
}

export default App;
